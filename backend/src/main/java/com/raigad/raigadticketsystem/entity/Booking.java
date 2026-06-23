package com.raigad.raigadticketsystem.entity;

import com.raigad.raigadticketsystem.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookingId;

    private Long userId;

    private Long slotId;

    private Integer visitorCount;

    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;

    private String qrToken;

    private LocalDateTime bookingDate;

    private LocalDateTime createdAt;
}