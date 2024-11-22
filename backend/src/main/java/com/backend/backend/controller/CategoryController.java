package com.backend.backend.controller;

import com.backend.backend.model.Category;
import com.backend.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> addCategory(@RequestBody Category category) {
        try {
            categoryService.save(category);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Catégorie ajoutée avec succès : " + category.getName());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> putCategory(@PathVariable Long id, @RequestBody Category category) {
        try {
            categoryService.update(id, category);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Catégorie modifié avec succès : " + category.getName());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping("list")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("details/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }
}
