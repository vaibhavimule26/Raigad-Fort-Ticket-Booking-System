package com.raigad.raigadticketsystem.controller;

import com.raigad.raigadticketsystem.dto.LoginRequest;
import com.raigad.raigadticketsystem.dto.OtpRequest;
import com.raigad.raigadticketsystem.dto.RegisterRequest;
import com.raigad.raigadticketsystem.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {

        this.authService = authService;

    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request
    ) {

        return authService.register(
                request
        );

    }

    @PostMapping("/login")
    public String login(
            @RequestBody LoginRequest request
    ) {

        return authService.login(
                request
        );

    }

    @PostMapping("/verify-otp")
    public String verifyOtp(
            @RequestBody OtpRequest request
    ) {

        return authService.verifyOtp(
                request.getEmail(),
                request.getOtp()
        );

    }

    @PostMapping("/resend-otp")
    public String resendOtp(
            @RequestBody OtpRequest request
    ) {

        return authService.resendOtp(
                request.getEmail()
        );

    }

}