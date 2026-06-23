package com.raigad.raigadticketsystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "visitor_passes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VisitorPass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookingId;

    private String visitorName;

    @Column(unique = true)
    private String qrToken;

    private String status;
}