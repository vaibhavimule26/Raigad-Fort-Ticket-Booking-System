package com.raigad.raigadticketsystem.service;

import com.raigad.raigadticketsystem.config.JwtUtil;
import com.raigad.raigadticketsystem.dto.LoginRequest;
import com.raigad.raigadticketsystem.dto.RegisterRequest;
import com.raigad.raigadticketsystem.entity.User;
import com.raigad.raigadticketsystem.enums.Role;
import com.raigad.raigadticketsystem.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AuthService(
            UserRepository userRepository,
            JwtUtil jwtUtil,
            EmailService emailService
    ) {

        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;

    }

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(
                request.getEmail()
        )) {

            return "Email already exists!";

        }

        String otp =
                String.valueOf(
                        (int) (100000 + Math.random() * 900000)
                );

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .city(request.getCity())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .role(
                        request.getRole() != null
                                ? Role.valueOf(request.getRole())
                                : Role.ROLE_CUSTOMER
                )
                .otp(otp)
                .otpExpiry(
                        LocalDateTime.now().plusMinutes(5)
                )
                .verified(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        emailService.sendOtpEmail(
                user.getEmail(),
                otp
        );

        return "Account created successfully. OTP sent to your email.";

    }

    public String login(LoginRequest request) {

        Optional<User> userOptional =
                userRepository.findByEmail(
                        request.getEmail()
                );

        if (userOptional.isEmpty()) {

            return "Invalid Email or Password";

        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            return "Invalid Email or Password";

        }

        if (!user.getVerified()) {

            return "Please verify your account first.";

        }

        return jwtUtil.generateToken(
                user.getEmail()
        );

    }

    public String verifyOtp(
            String email,
            String otp
    ) {

        Optional<User> userOptional =
                userRepository.findByEmail(
                        email
                );

        if (userOptional.isEmpty()) {

            return "User Not Found";

        }

        User user = userOptional.get();

        if (!user.getOtp().equals(
                otp
        )) {

            return "Invalid OTP";

        }

        if (user.getOtpExpiry().isBefore(
                LocalDateTime.now()
        )) {

            return "OTP Expired";

        }

        user.setVerified(true);

        user.setOtp(null);

        user.setOtpExpiry(null);

        userRepository.save(user);

        return "Verification Successful";

    }

    public String resendOtp(
            String email
    ) {

        Optional<User> userOptional =
                userRepository.findByEmail(
                        email
                );

        if (userOptional.isEmpty()) {

            return "User Not Found";

        }

        User user = userOptional.get();

        String otp =
                String.valueOf(
                        (int) (100000 + Math.random() * 900000)
                );

        user.setOtp(otp);

        user.setOtpExpiry(
                LocalDateTime.now().plusMinutes(5)
        );

        userRepository.save(user);

        emailService.sendOtpEmail(
                email,
                otp
        );

        return "OTP Sent Successfully";

    }

}