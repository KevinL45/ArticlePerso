package com.backend.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.model.Gallery;
import com.backend.backend.repository.GalleryRepository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;
    private Date now = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

    public Gallery save(Gallery gallery) {
        return galleryRepository.save(gallery);
    }

    public Gallery update(Long id, Gallery gallery) {
        Optional<Gallery> existingGallery = galleryRepository.findById(id);
        if (existingGallery.isPresent()) {
            gallery.setUpdatedDate(now);
            return galleryRepository.save(gallery);
        } else {
            throw new IllegalArgumentException("Aucune gallerie");
        }
    }

    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    public Gallery getGalleryById(Long id) {
        return galleryRepository.findById(id).orElseThrow(() -> new RuntimeException("Aucune galerie"));
    }

}
