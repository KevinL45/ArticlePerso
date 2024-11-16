package com.backend.backend.service;

import com.backend.backend.model.Article;
import com.backend.backend.repository.ArticleRespoitory;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

public class ArticleService {

    @Autowired
    private ArticleRespoitory articleRespoitory;

    public Article save(Article article) {
        article.setCreatedDate(null);
        article.setUpdatedDate(null);
        return articleRespoitory.save(article);
    }

    public Article update(Long id, Article article) {
        Optional<Article> existingArticle = articleRespoitory.findById(id);
        if (existingArticle.isPresent()) {
            Article updatedArticle = existingArticle.get();
            updatedArticle.setCreatedDate(null);
            updatedArticle.setUpdatedDate(null);
            return articleRespoitory.save(article);
        } else {
            throw new RuntimeException("Aucune article");
        }
    }

    public List<Article> getAllArticles() {
        return articleRespoitory.findAll();
    }

    public Article getArticleById(Long id) {
        return articleRespoitory.findById(id).orElseThrow(() -> new RuntimeException("Aucune article"));
    }

}
