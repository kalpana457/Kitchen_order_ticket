package com.example.kot.controller;

import com.example.kot.entity.Order;
import com.example.kot.entity.Payment;
import com.example.kot.repository.OrderRepository;
import com.example.kot.repository.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    // ------------------------
    // Make payment for an order
    // ------------------------
    @PostMapping
    public Payment makePayment(@RequestBody Payment paymentRequest) {

        // Validate order ID
        if (paymentRequest.getOrder() == null || paymentRequest.getOrder().getId() == null) {
            throw new RuntimeException("Order ID is required for payment");
        }

        // Find order
        Order order = orderRepository.findById(paymentRequest.getOrder().getId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Create new payment
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount().doubleValue());
        payment.setPaymentMethod(paymentRequest.getPaymentMethod());
        payment.setStatus("SUCCESS");
        payment.setPaymentDate(new Timestamp(System.currentTimeMillis()));

        // Save payment
        Payment savedPayment = paymentRepository.save(payment);

        // ✅ FIX: Set as List
        order.setPayments(List.of(savedPayment));
        order.setStatus("PAID");

        orderRepository.save(order);

        return savedPayment;
    }

    // ------------------------
    // Get all payments
    // ------------------------
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // ------------------------
    // Get payments for a specific order
    // ------------------------
    @GetMapping("/order/{orderId}")
    public List<Payment> getPaymentsByOrder(@PathVariable Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return order.getPayments(); // ✅ returns List<Payment>
    }
}