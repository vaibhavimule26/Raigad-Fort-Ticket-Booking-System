package com.raigad.raigadticketsystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "ticket_slots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slotName;

    private LocalDate visitDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private Double ticketPrice;

    private Integer maxCapacity;

    private Integer availableCapacity;

    private LocalDateTime createdAt;
}