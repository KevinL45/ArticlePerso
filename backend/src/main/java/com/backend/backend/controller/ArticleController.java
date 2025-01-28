package com.backend.backend.controller;

import com.backend.backend.service.ArticleService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.backend.backend.model.Article;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    public ArticleController() {
    }

    @Autowired
    private ArticleService articleService;

    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> addArticle(@RequestBody Article article) {
        try {
            articleService.save(article);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> putArticle(@PathVariable Long id, @RequestBody Article article) {
        try {
            articleService.update(id, article);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("L'article a été modifié");
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
