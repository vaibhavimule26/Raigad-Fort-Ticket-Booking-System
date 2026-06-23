package com.raigad.raigadticketsystem.controller;

import com.raigad.raigadticketsystem.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @GetMapping("/test")
    public String test() {
        return "Chatbot API Working";
    }

    @GetMapping("/ask")
    public String askBot(
            @RequestParam String message) {

        return geminiService.askGemini(message);
    }
}