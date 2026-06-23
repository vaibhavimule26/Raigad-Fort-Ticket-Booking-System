package com.raigad.raigadticketsystem.service;

import com.raigad.raigadticketsystem.repository.BookingRepository;
import com.raigad.raigadticketsystem.repository.TicketSlotRepository;
import com.raigad.raigadticketsystem.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.raigad.raigadticketsystem.enums.BookingStatus;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final TicketSlotRepository ticketSlotRepository;

    public AdminService(
            UserRepository userRepository,
            BookingRepository bookingRepository,
            TicketSlotRepository ticketSlotRepository) {

        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.ticketSlotRepository = ticketSlotRepository;
    }

    public Long getTotalUsers() {
        return userRepository.count();
    }

    public Long getTotalBookings() {
        return bookingRepository.count();
    }

    public Double getTotalRevenue() {
        return bookingRepository.findAll()
                .stream()
                .mapToDouble(b -> b.getTotalAmount())
                .sum();
    }

    public Integer getAvailableCapacity() {
        return ticketSlotRepository.findAll()
                .stream()
                .mapToInt(slot -> slot.getAvailableCapacity())
                .sum();
    }
    public Long getTotalEntries() {

        return bookingRepository.findAll()
                .stream()
                .filter(b ->
                        b.getBookingStatus() ==
                                BookingStatus.ENTERED)
                .count();
    }
    public Long getTotalExits() {

        return bookingRepository.findAll()
                .stream()
                .filter(b ->
                        b.getBookingStatus() ==
                                BookingStatus.EXITED)
                .count();
    }
}