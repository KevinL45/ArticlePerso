package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backend.model.Gallery;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRespository extends JpaRepository<Gallery, Long> {

}
