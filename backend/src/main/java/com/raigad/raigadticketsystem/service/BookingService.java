package com.raigad.raigadticketsystem.service;

import com.raigad.raigadticketsystem.dto.BookingRequest;
import com.raigad.raigadticketsystem.dto.BookingLogResponse;
import com.raigad.raigadticketsystem.entity.Booking;
import com.raigad.raigadticketsystem.entity.TicketSlot;
import com.raigad.raigadticketsystem.entity.User;
import com.raigad.raigadticketsystem.entity.Booking;
import com.raigad.raigadticketsystem.entity.TicketSlot;
import com.raigad.raigadticketsystem.entity.User;
import com.raigad.raigadticketsystem.entity.VisitorPass;

import com.raigad.raigadticketsystem.repository.BookingRepository;
import com.raigad.raigadticketsystem.repository.TicketSlotRepository;
import com.raigad.raigadticketsystem.repository.UserRepository;
import com.raigad.raigadticketsystem.repository.VisitorPassRepository;
import com.raigad.raigadticketsystem.enums.BookingStatus;
import com.raigad.raigadticketsystem.repository.BookingRepository;
import com.raigad.raigadticketsystem.repository.TicketSlotRepository;
import com.raigad.raigadticketsystem.repository.UserRepository;
import com.raigad.raigadticketsystem.util.PDFGenerator;
import com.raigad.raigadticketsystem.util.QRCodeGenerator;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {


    private final BookingRepository bookingRepository;
    private final TicketSlotRepository ticketSlotRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final VisitorPassRepository visitorPassRepository;


    public BookingService(
            BookingRepository bookingRepository,
            TicketSlotRepository ticketSlotRepository,
            UserRepository userRepository,
            EmailService emailService,
            VisitorPassRepository visitorPassRepository) {

        this.bookingRepository = bookingRepository;
        this.ticketSlotRepository = ticketSlotRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.visitorPassRepository =
                visitorPassRepository;
    }

    public String bookTicket(BookingRequest request) {

        TicketSlot slot = ticketSlotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new RuntimeException("Slot Not Found"));

        int visitorCount =
                request.getAdultCount()
                        + request.getChildCount()
                        + request.getForeignCount()
                        + request.getStudentCount();

        if (slot.getAvailableCapacity() < visitorCount) {
            return "Not Enough Capacity Available";
        }



        double totalAmount =
                request.getAdultCount() * 50 +
                        request.getChildCount() * 25 +
                        request.getForeignCount() * 600 +
                        request.getStudentCount() * 30;

        slot.setAvailableCapacity(
                slot.getAvailableCapacity() - visitorCount
        );

        ticketSlotRepository.save(slot);

        Booking booking = Booking.builder()
                .bookingId("RGD-" + UUID.randomUUID().toString().substring(0, 8))
                .userId(request.getUserId())
                .slotId(request.getSlotId())
                .visitorCount(visitorCount)
                .totalAmount(totalAmount)
                .bookingStatus(BookingStatus.BOOKED)
                .qrToken(UUID.randomUUID().toString())
                .bookingDate(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .build();

        bookingRepository.save(booking);

        User emailUser = userRepository.findById(
                request.getUserId()
        ).orElseThrow(() ->
                new RuntimeException("User Not Found"));

        String baseName =
                emailUser.getFullName()
                        .replace(" ", "_")
                        .toUpperCase();

        try {

            for (int i = 1;
                 i <= booking.getVisitorCount();
                 i++) {

                String visitorName =
                        baseName + "_" + i;

                String qrToken =
                        visitorName + "_" +
                                booking.getBookingId();

                VisitorPass visitorPass =
                        VisitorPass.builder()
                                .bookingId(
                                        booking.getBookingId()
                                )
                                .visitorName(
                                        visitorName
                                )
                                .qrToken(
                                        qrToken
                                )
                                .status("BOOKED")
                                .build();

                visitorPassRepository.save(
                        visitorPass
                );

                QRCodeGenerator.generateQRCode(
                        qrToken,
                        "qr-codes/" +
                                visitorName +
                                ".png"
                );
            }

            PDFGenerator.generateTicket(
                    booking.getBookingId(),
                    booking.getUserId(),
                    booking.getSlotId(),
                    booking.getVisitorCount(),
                    booking.getTotalAmount(),
                    baseName,
                    "pdf-tickets/" +
                            booking.getBookingId() +
                            ".pdf"
            );

        } catch (Exception e) {
            e.printStackTrace();
        }

        try {

            User user = userRepository.findById(
                    request.getUserId()
            ).orElseThrow(() ->
                    new RuntimeException("User Not Found"));

            emailService.sendTicketEmail(
                    emailUser.getEmail(),
                    booking.getBookingId()

            );

            System.out.println("Email Sent Successfully");

        } catch (Exception e) {

            System.out.println("Email Sending Failed");
            e.printStackTrace();
        }

        return "Booking Successful";
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
    public List<BookingLogResponse> getBookingLogs() {

        List<Booking> bookings =
                bookingRepository.findAll();

        return bookings.stream()
                .map(booking -> {

                    User user =
                            userRepository.findById(
                                    booking.getUserId()
                            ).orElse(null);

                    return new BookingLogResponse(
                            booking.getId(),
                            booking.getBookingId(),
                            user != null
                                    ? user.getFullName()
                                    : "Unknown",
                            booking.getBookingStatus().name(),
                            booking.getBookingDate().toString()
                    );

                }).toList();
    }

    public String verifyTicket(String qrToken) {

        Booking booking = bookingRepository
                .findByQrToken(qrToken)
                .orElseThrow(() ->
                        new RuntimeException("Invalid QR Code"));

        if (booking.getBookingStatus() == BookingStatus.BOOKED) {

            booking.setBookingStatus(BookingStatus.ENTERED);

            bookingRepository.save(booking);

            return "Entry Allowed";
        }

        if (booking.getBookingStatus() == BookingStatus.ENTERED) {

            booking.setBookingStatus(BookingStatus.EXITED);

            bookingRepository.save(booking);

            return "Exit Recorded Successfully";
        }

        if (booking.getBookingStatus() == BookingStatus.EXITED) {

            return "QR Expired - Ticket Already Used";
        }

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {

            return "Booking Cancelled";
        }

        if (booking.getBookingStatus() == BookingStatus.EXPIRED) {

            return "Ticket Expired";
        }

        return "Invalid Booking Status";
    }
    public String cancelBooking(String bookingId) {

        Booking booking = bookingRepository
                .findByBookingId(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking Not Found"));

        booking.setBookingStatus(
                BookingStatus.CANCELLED
        );

        bookingRepository.save(booking);

        return "Booking Cancelled Successfully";
    }



}
