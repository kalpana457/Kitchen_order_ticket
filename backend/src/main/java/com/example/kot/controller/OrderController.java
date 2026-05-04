package com.example.kot.controller;

import com.example.kot.entity.Order;
import com.example.kot.entity.OrderItem;
import com.example.kot.entity.Payment;
import com.example.kot.repository.OrderItemRepository;
import com.example.kot.repository.OrderRepository;
import com.example.kot.repository.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    // ------------------------
    // Place a new order
    // ------------------------
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        // 1. Set initial status
        order.setStatus("PENDING");

        // 2. Save order first to generate an ID
        Order savedOrder = orderRepository.save(order);

        // 3. Link and save order items
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(savedOrder);
                // item.getMenuItem() must contain at least the ID from the frontend
                orderItemRepository.save(item);
            }
        }

        return savedOrder;
    }

    // ------------------------
    // Make payment for an order
    // ------------------------
    @PostMapping("/{orderId}/payment")
    public Payment makePayment(@PathVariable Long orderId, @RequestBody Payment payment) {

        // 1. Find the existing order
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // 2. Set payment details
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount().doubleValue());
        payment.setStatus("SUCCESS");
        payment.setPaymentDate(new Timestamp(System.currentTimeMillis()));

        // 3. Save the payment record
        Payment savedPayment = paymentRepository.save(payment);

        // 4. Update Order status and Payments list
        // Fix: Use a mutable ArrayList to avoid UnsupportedOperationException
        List<Payment> paymentList = new ArrayList<>();
        paymentList.add(savedPayment);
        
        order.setPayments(paymentList);
        order.setStatus("PAID");

        // 5. Persist the updated order
        orderRepository.save(order);

        return savedPayment;
    }

    // ------------------------
    // Get all orders (with Eager Loading simulation)
    // ------------------------
    @GetMapping
    public List<Order> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        // Trigger loading of nested collections if not using Eager FetchType
        orders.forEach(o -> {
            if (o.getItems() != null) o.getItems().size();
            if (o.getPayments() != null) o.getPayments().size();
        });

        return orders;
    }

    // ------------------------
    // Get orders by customer
    // ------------------------
    @GetMapping("/customer/{name}")
    public List<Order> getOrdersByCustomer(@PathVariable String name) {
        List<Order> orders = orderRepository.findByCustomerName(name);

        orders.forEach(o -> {
            if (o.getItems() != null) o.getItems().size();
            if (o.getPayments() != null) o.getPayments().size();
        });

        return orders;
    }

    // ------------------------
    // Update Order Status (Chef/Waiter)
    // ------------------------
    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestParam String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        return orderRepository.save(order);
    }

    // ------------------------
    // Delete an Order
    // ------------------------
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
        return "Order deleted successfully";
    }
}