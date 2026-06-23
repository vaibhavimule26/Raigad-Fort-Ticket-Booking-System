package com.raigad.raigadticketsystem.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingLogResponse {

    private Long id;

    private String bookingId;

    private String visitorName;

    private String bookingStatus;

    private String bookingDate;
}