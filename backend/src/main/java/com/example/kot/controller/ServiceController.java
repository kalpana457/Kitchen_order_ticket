package com.example.kot.controller;

import com.example.kot.entity.ServiceRequest;
import com.example.kot.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private ServiceRequestRepository repository;

    // Create a new request (e.g., "Need Water")
    @PostMapping("/summon")
    public ResponseEntity<ServiceRequest> summonWaiter(@RequestBody ServiceRequest request) {
        request.setStatus("PENDING"); // Now this will work!
        ServiceRequest savedRequest = repository.save(request);
        return ResponseEntity.ok(savedRequest);
    }

    // Get all pending requests for the Waiter Dashboard
    @GetMapping("/active")
    public List<ServiceRequest> getActiveRequests() {
        return repository.findByStatusOrderByRequestTimeDesc("PENDING");
    }

    // Mark a request as done
    @PutMapping("/{id}/complete")
    public ResponseEntity<ServiceRequest> completeRequest(@PathVariable Long id) {
        return repository.findById(id).map(req -> {
            req.setStatus("COMPLETED"); // Now this will work!
            return ResponseEntity.ok(repository.save(req));
        }).orElse(ResponseEntity.notFound().build());
    }
}