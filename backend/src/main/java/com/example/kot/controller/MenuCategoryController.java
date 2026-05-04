package com.example.kot.controller;

import com.example.kot.entity.MenuCategory;
import com.example.kot.repository.MenuCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuCategoryController {

    @Autowired
    private MenuCategoryRepository categoryRepository;

    @GetMapping
    public List<MenuCategory> getAllCategoriesWithItems() {
        // This returns categories with their nested menu items
        return categoryRepository.findAll();
    }
}