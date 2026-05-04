package com.example.kot.controller;

import com.example.kot.entity.Staff;
import com.example.kot.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:3000")
public class StaffController {

    @Autowired
    private StaffRepository staffRepository;

    @PostMapping("/login")
    public Staff login(@RequestBody Staff loginData) {
        Optional<Staff> staff = staffRepository
                .findByEmailAndPassword(loginData.getEmail(), loginData.getPassword());

        return staff.orElse(null);
    }
}