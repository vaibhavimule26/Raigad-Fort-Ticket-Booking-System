package com.raigad.raigadticketsystem.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String fullName;
    private String email;
    private String phone;
    private String city;
    private String password;
    private String role;
}