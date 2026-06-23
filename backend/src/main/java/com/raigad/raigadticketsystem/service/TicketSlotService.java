package com.raigad.raigadticketsystem.service;

import com.raigad.raigadticketsystem.dto.TicketSlotRequest;
import com.raigad.raigadticketsystem.entity.TicketSlot;
import com.raigad.raigadticketsystem.repository.TicketSlotRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketSlotService {

    private final TicketSlotRepository ticketSlotRepository;

    public TicketSlotService(TicketSlotRepository ticketSlotRepository) {
        this.ticketSlotRepository = ticketSlotRepository;
    }

    public String addSlot(TicketSlotRequest request) {

        TicketSlot slot = TicketSlot.builder()
                .slotName(request.getSlotName())
                .visitDate(request.getVisitDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .ticketPrice(request.getTicketPrice())
                .maxCapacity(request.getMaxCapacity())
                .availableCapacity(request.getMaxCapacity())
                .createdAt(LocalDateTime.now())
                .build();

        ticketSlotRepository.save(slot);

        return "Slot Added Successfully";
    }

    public List<TicketSlot> getAllSlots() {

        return ticketSlotRepository.findAll();
    }

    public String deleteSlot(Long id) {

        ticketSlotRepository.deleteById(id);

        return "Slot Deleted Successfully";
    }
}