package com.raigad.raigadticketsystem.controller;

import com.raigad.raigadticketsystem.entity.User;
import com.raigad.raigadticketsystem.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @GetMapping("/email/{email}")
    public User getUserByEmail(
            @PathVariable String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));
    }

    @PutMapping("/update/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));

        user.setFullName(updatedUser.getFullName());
        user.setPhone(updatedUser.getPhone());
        user.setCity(updatedUser.getCity());

        return userRepository.save(user);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        userRepository.deleteById(id);

        return "User Deleted Successfully";
    }
}