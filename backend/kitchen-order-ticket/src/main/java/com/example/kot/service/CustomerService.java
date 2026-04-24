package com.example.kot.service;

import com.example.kot.entity.Customer;
import com.example.kot.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer registerCustomer(Customer customer) throws Exception {
        if(customerRepository.existsByEmail(customer.getEmail())) {
            throw new Exception("Email already registered");
        }
        return customerRepository.save(customer);
    }
}