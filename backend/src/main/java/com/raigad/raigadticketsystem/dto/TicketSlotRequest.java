package com.raigad.raigadticketsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class TicketSlotRequest {

    private String slotName;
    private LocalDate visitDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Double ticketPrice;
    private Integer maxCapacity;
}