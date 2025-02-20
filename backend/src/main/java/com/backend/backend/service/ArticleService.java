package com.backend.backend.service;

import com.backend.backend.model.Article;
import com.backend.backend.repository.ArticleRespoitory;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    @Autowired
    private ArticleRespoitory articleRespoitory;

    private Date now = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

    public Article save(Article article) {
        article.setCreatedDate(now);
        article.setUpdatedDate(now);
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

    public List<Article> getAllArticles() {
        return articleRespoitory.findAll();
    }

    public Article getArticleById(Long id) {
        return articleRespoitory.findById(id).orElseThrow(() -> new RuntimeException("Aucune article"));
    }

}
