package com.backend.backend.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.backend.model.Gallery;
import com.backend.backend.model.User;
import com.backend.backend.service.ArticleService;
import com.backend.backend.service.GalleryService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/galleries")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @Autowired
    private ArticleService articleService;

    private Date now = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> addGallery(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("logo") MultipartFile logoFile,
            @RequestParam("background") MultipartFile backgroundFile,
            @RequestParam("user") String userJson) throws IOException, JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.readValue(userJson, User.class);

        String logo = articleService.saveImage(logoFile);
        String background = articleService.saveImage(backgroundFile);

        Gallery gallery = new Gallery(name, null, logo, background, description, now, now, null, user);

        try {
            galleryService.save(gallery);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("");
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
