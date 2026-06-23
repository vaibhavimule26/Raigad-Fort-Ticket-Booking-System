package com.raigad.raigadticketsystem.repository;

import com.raigad.raigadticketsystem.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository
        extends JpaRepository<Feedback, Long> {
}