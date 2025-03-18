package com.backend.backend.service;

import com.backend.backend.model.Article;
import com.backend.backend.repository.ArticleRespository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ArticleService {

    @Autowired
    private ArticleRespository articleRespoitory;

    public Article saveArticle(Article article) {
        return articleRespoitory.save(article);
    }

    public Article updateArticle(Long id, Article article, MultipartFile file) {
        Optional<Article> existingArticle = articleRespoitory.findById(id);
        if (existingArticle.isPresent()) {
            Article updatedArticle = existingArticle.get();
            updatedArticle.setTitle(article.getTitle());
            updatedArticle.setDescription(article.getDescription());
            updatedArticle.setImageUrl(article.getImageUrl());
            updatedArticle.setCategory(article.getCategory());
            updatedArticle.setUser(article.getUser());
            updatedArticle.setUpdatedDate(article.getUpdatedDate());
            return articleRespoitory.save(updatedArticle);
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

    public String updateImage(MultipartFile file, String oldImageUrl) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier est vide ou invalide.");
        }

        // Définir l'emplacement de stockage
        String uploadDir = "uploads/";
        File uploadPath = new File(uploadDir);

        // Créer le dossier s'il n'existe pas
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }

        // Supprimer l'ancienne image si elle existe
        if (oldImageUrl != null && !oldImageUrl.isEmpty()) {
            Path oldFilePath = Paths.get(oldImageUrl.replace("/uploads/", uploadDir));
            File oldFile = oldFilePath.toFile();
            if (oldFile.exists()) {
                oldFile.delete(); // Suppression du fichier
            }
        }

        // Sauvegarder la nouvelle image avec un nom unique
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Retourner la nouvelle URL de l'image
        return "/uploads/" + fileName;
    }

    public List<Article> getAllArticles() {
        return articleRespoitory.findAll();
    }

    public Article getArticleById(Long id) {
        return articleRespoitory.findById(id).orElseThrow(() -> new RuntimeException("Aucune article"));
    }

}
