package com.backend.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.backend.backend.model.Gallery;
import com.backend.backend.service.GalleryService;

public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public Gallery addGallery(@RequestBody Gallery gallery) {
        return galleryService.save(gallery);
    }

    @PutMapping("update/{id}")
    public Gallery putGallery(@PathVariable Long id, @RequestBody Gallery gallery) {
        return galleryService.update(id, gallery);
    }

    @GetMapping("list")
    public List<Gallery> getAllGalleries() {
        return galleryService.getAllGalleries();
    }

    @GetMapping("details/{id}")
    public Gallery getGalleryById(@PathVariable Long id) {
        return galleryService.getGalleryById(id);
    }

}
