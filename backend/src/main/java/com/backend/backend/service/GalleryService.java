package com.backend.backend.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.backend.backend.model.Gallery;
import com.backend.backend.repository.GalleryRepository;

import java.util.List;
import java.util.Optional;

public class GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    public Gallery save(Gallery gallery) {
        gallery.setCreatedDate(null);
        gallery.setUpdatedDate(null);
        return galleryRepository.save(gallery);
    }

    public Gallery update(Long id, Gallery gallery) {
        Optional<Gallery> existingGallery = galleryRepository.findById(id);
        if (existingGallery.isPresent()) {
            gallery.setUpdatedDate(null);
            return galleryRepository.save(gallery);
        } else {
            throw new RuntimeException("Aucune galerie");
        }
    }

    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    public Gallery getGalleryById(Long id) {
        return galleryRepository.findById(id).orElseThrow(() -> new RuntimeException("Aucune galerie"));
    }

}
