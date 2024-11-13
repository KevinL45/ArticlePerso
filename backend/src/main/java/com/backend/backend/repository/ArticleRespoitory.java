package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backend.model.Article;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRespoitory extends JpaRepository<Article, Long> {

}
