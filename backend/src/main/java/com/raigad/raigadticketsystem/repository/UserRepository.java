package com.raigad.raigadticketsystem.repository;

import com.raigad.raigadticketsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    Optional<User> findByVerificationToken(
            String verificationToken
    );

    Optional<User> findByEmail(String email);
}