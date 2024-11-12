package com.backend.backend.model;

import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private String description;

    private String imageUrl;

    // Constructeur par défaut
    public Article() {
    }

    // Constructeur avec paramètres
    public Article(String title, String description, String imageUrl) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    // Getter pour 'id'
    public long getId() {
        return id;
    }

    // Setter pour 'id'
    public void setId(long id) {
        this.id = id;
    }

    // Getter pour 'title'
    public String getTitle() {
        return title;
    }

    // Setter pour 'title'
    public void setTitle(String title) {
        this.title = title;
    }

    // Getter pour 'description'
    public String getDescription() {
        return description;
    }

    // Setter pour 'description'
    public void setDescription(String description) {
        this.description = description;
    }

    // Getter pour 'imageUrl'
    public String getImageUrl() {
        return imageUrl;
    }

    // Setter pour 'imageUrl'
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
