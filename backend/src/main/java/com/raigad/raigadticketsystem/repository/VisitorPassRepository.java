package com.raigad.raigadticketsystem.repository;

import com.raigad.raigadticketsystem.entity.VisitorPass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VisitorPassRepository
        extends JpaRepository<VisitorPass, Long> {

    Optional<VisitorPass> findByQrToken(
            String qrToken
    );
}