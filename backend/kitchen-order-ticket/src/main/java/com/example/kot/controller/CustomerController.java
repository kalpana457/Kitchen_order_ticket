package com.example.kot.controller;

import com.example.kot.entity.Customer;
import com.example.kot.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public Customer registerCustomer(@RequestBody Customer customer) {
        try {
            return customerService.registerCustomer(customer);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}