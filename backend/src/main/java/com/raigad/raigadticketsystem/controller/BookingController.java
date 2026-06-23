package com.raigad.raigadticketsystem.controller;

import com.raigad.raigadticketsystem.dto.BookingLogResponse;
import com.raigad.raigadticketsystem.dto.BookingRequest;
import com.raigad.raigadticketsystem.entity.Booking;
import com.raigad.raigadticketsystem.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(
            BookingService bookingService) {

        this.bookingService = bookingService;
    }

    @PostMapping("/book")
    public String bookTicket(
            @RequestBody BookingRequest request) {

        return bookingService.bookTicket(request);
    }

    @GetMapping("/all")
    public List<Booking> getAllBookings() {

        return bookingService.getAllBookings();
    }

    @GetMapping("/logs")
    public List<BookingLogResponse> getLogs() {

        return bookingService.getBookingLogs();
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(
            @PathVariable Long userId) {

        return bookingService.getBookingsByUser(userId);
    }

    @PostMapping("/verify/{qrToken}")
    public String verifyTicket(
            @PathVariable String qrToken) {

        return bookingService.verifyTicket(qrToken);
    }

    @PutMapping("/cancel/{bookingId}")
    public String cancelBooking(
            @PathVariable String bookingId) {

        return bookingService.cancelBooking(
                bookingId
        );
    }
}