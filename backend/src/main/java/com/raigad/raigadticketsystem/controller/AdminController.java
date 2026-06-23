package com.raigad.raigadticketsystem.controller;

import com.raigad.raigadticketsystem.service.AdminService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/total-users")
    public Long getTotalUsers() {
        return adminService.getTotalUsers();
    }

    @GetMapping("/total-bookings")
    public Long getTotalBookings() {
        return adminService.getTotalBookings();
    }

    @GetMapping("/total-revenue")
    public Double getTotalRevenue() {
        return adminService.getTotalRevenue();
    }

    @GetMapping("/available-capacity")
    public Integer getAvailableCapacity() {
        return adminService.getAvailableCapacity();
    }
    @GetMapping("/total-entries")
    public Long getTotalEntries() {
        return adminService.getTotalEntries();
    }
    @GetMapping("/total-exits")
    public Long getTotalExits() {
        return adminService.getTotalExits();
    }
}