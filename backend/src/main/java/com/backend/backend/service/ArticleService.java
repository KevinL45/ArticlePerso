package com.backend.backend.service;

import com.backend.backend.model.Article;
import com.backend.backend.repository.ArticleRespoitory;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ArticleService {

    @Autowired
    private ArticleRespoitory articleRespoitory;

    private Date now = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

    public Article save(Article article) {
        return articleRespoitory.save(article);
    }

    public Article update(Long id, Article article) {
        Optional<Article> existingArticle = articleRespoitory.findById(id);
        if (existingArticle.isPresent()) {
            Article updatedArticle = existingArticle.get();
            updatedArticle.setCreatedDate(now);
            updatedArticle.setUpdatedDate(now);
            return articleRespoitory.save(article);
        } else {
            throw new IllegalArgumentException("Aucune article");
        }
    }

    public String saveImage(MultipartFile file) throws IOException {
        // Définir l'emplacement de stockage
        String uploadDir = "uploads/";
        File uploadPath = new File(uploadDir);

        // Créer le dossier s'il n'existe pas
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }

        // Sauvegarder l'image avec un nom unique
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Retourner l'URL de l'image (ici juste le chemin, à adapter si besoin)
        return "/uploads/" + fileName;
    }

    public List<Article> getAllArticles() {
        return articleRespoitory.findAll();
    }

    public Article getArticleById(Long id) {
        return articleRespoitory.findById(id).orElseThrow(() -> new RuntimeException("Aucune article"));
    }

}
