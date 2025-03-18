package com.backend.backend.controller;

import com.backend.backend.service.ArticleService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backend.backend.model.Article;
import com.backend.backend.model.Category;
import com.backend.backend.model.User;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    public ArticleController() {
    }

    @Autowired
    private ArticleService articleService;

    private Date now = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> addArticle(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("category") String categoryJson,
            @RequestParam("user") String userJson,
            @RequestPart("file") MultipartFile file) throws IOException, JsonProcessingException {

        // Convertir les objets JSON en Java (catégorie et utilisateur)
        ObjectMapper objectMapper = new ObjectMapper();
        Category category = objectMapper.readValue(categoryJson, Category.class);
        User user = objectMapper.readValue(userJson, User.class);

        // Enregistrer l'image et récupérer son URL
        String imageUrl = articleService.saveImage(file);

        // Création d'un article
        Article article = new Article(title, description, imageUrl, now, now, null, user, category);
        System.out.println(article);

        try {
            articleService.saveArticle(article);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> putArticle(@PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("imageUrl") String imageUrl,
            @RequestParam("category") String categoryJson,
            @RequestParam("user") String userJson,
            @RequestPart("file") MultipartFile file) throws IOException, JsonProcessingException {

        // Convertir les objets JSON en Java (catégorie et utilisateur)
        ObjectMapper objectMapper = new ObjectMapper();
        Category category = objectMapper.readValue(categoryJson, Category.class);
        User user = objectMapper.readValue(userJson, User.class);

        String newImageUrl = "";
        // Mise à jour de l'image si un fichier est fourni
        if (file != null && !file.isEmpty()) {
            newImageUrl = articleService.updateImage(file, imageUrl);
        } else {
            newImageUrl = imageUrl;
        }

        Article article = new Article(title, description, newImageUrl, now, now, null, user, category);

        try {
            articleService.updateArticle(id, article, file);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping("list")
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping("details/{id}")
    public Article getArticleById(@PathVariable Long id) {
        return articleService.getArticleById(id);
    }

}
