package com.backend.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backend.model.Article;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRespository extends JpaRepository<Article, Long> {

    // Charge la catégorie avec l'article
    @EntityGraph(attributePaths = { "category" })
    Optional<Article> findById(Long id);

}
