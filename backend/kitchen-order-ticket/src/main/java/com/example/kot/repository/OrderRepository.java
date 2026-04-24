package com.example.kot.repository;

import com.example.kot.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Add this method to fix your error
    List<Order> findByCustomerName(String customerName);
}