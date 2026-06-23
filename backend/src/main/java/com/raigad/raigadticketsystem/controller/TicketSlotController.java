package com.raigad.raigadticketsystem.controller;

import com.raigad.raigadticketsystem.dto.TicketSlotRequest;
import com.raigad.raigadticketsystem.entity.TicketSlot;
import com.raigad.raigadticketsystem.service.TicketSlotService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin("*")
public class TicketSlotController {

    private final TicketSlotService ticketSlotService;

    public TicketSlotController(TicketSlotService ticketSlotService) {
        this.ticketSlotService = ticketSlotService;
    }

    @PostMapping("/add")
    public String addSlot(
            @RequestBody TicketSlotRequest request) {

        return ticketSlotService.addSlot(request);
    }

    @GetMapping("/all")
    public List<TicketSlot> getAllSlots() {

        return ticketSlotService.getAllSlots();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteSlot(
            @PathVariable Long id) {

        return ticketSlotService.deleteSlot(id);
    }
}