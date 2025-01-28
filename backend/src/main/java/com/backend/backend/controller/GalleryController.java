package com.backend.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.model.Gallery;
import com.backend.backend.service.GalleryService;

@RestController
@RequestMapping("/galleries")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> addGallery(@RequestBody Gallery gallery) {
        try {
            galleryService.save(gallery);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("La galerie a été crée");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> putGallery(@PathVariable Long id, @RequestBody Gallery gallery) {
        try {
            galleryService.update(id, gallery);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("La galerie a été modifié");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
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
