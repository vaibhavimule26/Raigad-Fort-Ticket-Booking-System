package com.raigad.raigadticketsystem.repository;

import com.raigad.raigadticketsystem.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    Optional<Booking> findByQrToken(String qrToken);

    Optional<Booking> findByBookingId(String bookingId);

}