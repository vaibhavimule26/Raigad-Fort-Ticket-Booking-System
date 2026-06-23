package com.raigad.raigadticketsystem.repository;

import com.raigad.raigadticketsystem.entity.TicketSlot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketSlotRepository extends JpaRepository<TicketSlot, Long> {
}