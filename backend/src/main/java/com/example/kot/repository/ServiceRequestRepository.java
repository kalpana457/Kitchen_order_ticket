package com.example.kot.repository;

import com.example.kot.entity.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    // Finds active calls and sorts them so the newest ones are at the top
    List<ServiceRequest> findByStatusOrderByRequestTimeDesc(String status);
}