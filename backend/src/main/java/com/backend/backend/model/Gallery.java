package com.backend.backend.model;

import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Entity;;

@Entity
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String video;

    private String logo;

    private String background;

    private String description;

    @ManyToOne
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date deletedDate;

    // Constructeur par défaut
    public Gallery() {
    }

    // Constructeur avec paramètres
    public Gallery(String name, String video, String logo, String background, String description) {
        this.name = name;
        this.video = video;
        this.logo = logo;
        this.background = background;
        this.description = description;
    }

    // Getter pour 'id'
    public long getId() {
        return id;
    }

    // Setter pour 'id'
    public void setId(long id) {
        this.id = id;
    }

    // Getter pour 'name'
    public String getName() {
        return name;
    }

    // Setter pour 'name'
    public void setName(String name) {
        this.name = name;
    }

    // Getter pour 'video'
    public String getVideo() {
        return video;
    }

    // Setter pour 'video'
    public void setVideo(String video) {
        this.video = video;
    }

    // Getter pour 'logo'
    public String getLogo() {
        return logo;
    }

    // Setter pour 'logo'
    public void setLogo(String logo) {
        this.logo = logo;
    }

    // Getter pour 'background'
    public String getBackground() {
        return background;
    }

    // Setter pour 'background'
    public void setBackground(String background) {
        this.background = background;
    }

    // Getter pour 'description'
    public String getDescription() {
        return description;
    }

    // Setter pour 'description'
    public void setDescription(String description) {
        this.description = description;
    }

    // Getter et Setter pour 'createdDate'
    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    // Getter et Setter pour 'updatedDate'
    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Date getDeletedDate() {
        return this.deletedDate;
    }

    public void setDeletedDate(Date deletedDate) {
        this.deletedDate = deletedDate;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
