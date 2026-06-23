package com.raigad.raigadticketsystem.controller;

import com.raigad.raigadticketsystem.entity.Feedback;
import com.raigad.raigadticketsystem.repository.FeedbackRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin("*")
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;

    public FeedbackController(
            FeedbackRepository feedbackRepository
    ) {
        this.feedbackRepository = feedbackRepository;
    }

    @PostMapping
    public Feedback saveFeedback(
            @RequestBody Feedback feedback
    ) {

        return feedbackRepository.save(
                feedback
        );
    }

    @GetMapping
    public List<Feedback> getAllFeedback() {

        return feedbackRepository.findAll();
    }
}