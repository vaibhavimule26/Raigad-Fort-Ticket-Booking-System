package com.raigad.raigadticketsystem.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendTicketEmail(
            String toEmail,
            String bookingId
    ) {

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            true
                    );

            helper.setTo(toEmail);

            helper.setSubject(
                    "Raigad Fort Ticket Confirmation"
            );

            helper.setText(
                    "Booking Successful!\n\n" +
                            "Booking ID: " + bookingId + "\n\n" +
                            "Your PDF Ticket is attached.\n\n" +
                            "Thank you for visiting Raigad Fort."
            );

            File pdfFile =
                    new File(
                            "pdf-tickets/" +
                                    bookingId +
                                    ".pdf"
                    );

            if (pdfFile.exists()) {

                helper.addAttachment(
                        bookingId + ".pdf",
                        new FileSystemResource(
                                pdfFile
                        )
                );
            }

            mailSender.send(message);

        } catch (Exception e) {

            e.printStackTrace();

        }
    }


    // EMAIL LINK VERIFICATION (OLD)
    public void sendVerificationEmail(
            String toEmail,
            String token
    ) {

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            true
                    );

            helper.setTo(toEmail);

            helper.setSubject(
                    "Verify Your Email - Raigad Fort"
            );

            helper.setText(
                    "Welcome to Raigad Fort Ticket System!\n\n" +
                            "Please verify your email by clicking the link below:\n\n" +
                            "http://localhost:8081/api/auth/verify?token="
                            + token +
                            "\n\nThank you."
            );

            mailSender.send(message);

        } catch (Exception e) {

            e.printStackTrace();

        }

    }


    // OTP EMAIL
    public void sendOtpEmail(
            String toEmail,
            String otp
    ) {

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            true
                    );

            helper.setTo(toEmail);

            helper.setSubject(
                    "Raigad Fort OTP Verification"
            );

            helper.setText(
                    "Welcome to Raigad Fort Ticket System.\n\n" +
                            "Your verification code is:\n\n" +
                            otp +
                            "\n\nThis OTP is valid for 5 minutes."
            );

            System.out.println(
                    "Sending OTP email to: "
                            + toEmail
            );

            mailSender.send(message);

            System.out.println(
                    "OTP email sent successfully"
            );

        } catch (Exception e) {

            System.out.println(
                    "OTP email failed"
            );

            e.printStackTrace();

        }

    }

}