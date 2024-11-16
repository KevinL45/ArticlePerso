package com.backend.backend.controller;

import com.backend.backend.service.ArticleService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.backend.backend.model.Article;

import org.springframework.web.bind.annotation.*;

public class ArticleController {

    @Autowired
    private ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    public Article addArticle(@RequestBody Article article) {
        return articleService.save(article);
    }

    @PutMapping("update/{id}")
    public Article putArticle(@PathVariable Long id, @RequestBody Article article) {
        return articleService.update(id, article);
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
