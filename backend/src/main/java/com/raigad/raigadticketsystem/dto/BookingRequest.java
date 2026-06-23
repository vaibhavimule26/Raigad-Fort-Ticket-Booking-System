package com.raigad.raigadticketsystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequest {

    private Long userId;
    private Long slotId;
    private Integer adultCount;
    private Integer childCount;
    private Integer foreignCount;
    private Integer studentCount;
}