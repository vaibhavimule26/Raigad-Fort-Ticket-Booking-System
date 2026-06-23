package com.raigad.raigadticketsystem.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final String SECRET =
            "RaigadFortTicketSystemJWTSecretKey2026RaigadFort";

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader =
                request.getHeader("Authorization");

        if (authHeader != null &&
                authHeader.startsWith("Bearer ")) {

            String token =
                    authHeader.substring(7);

            try {

                Claims claims = Jwts.parser()
                        .verifyWith(secretKey)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

                String email =
                        claims.getSubject();

                System.out.println(
                        "Authenticated User: " + email
                );

            } catch (Exception e) {

                e.printStackTrace();

                response.setStatus(
                        HttpServletResponse.SC_UNAUTHORIZED
                );

                response.getWriter()
                        .write(e.getMessage());

                return;

            }
        }

        filterChain.doFilter(request, response);
    }
}