package com.raigad.raigadticketsystem.entity;

import com.raigad.raigadticketsystem.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email;

    private String phone;

    private String city;

    private String otp;

    private LocalDateTime otpExpiry;

    private Boolean verified;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Boolean isVerified;

    private String verificationToken;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}