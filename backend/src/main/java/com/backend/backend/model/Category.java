package com.backend.backend.model;

public class Category {

    private String code;
    private String name;

    // Constructeur par défaut
    public Category() {
    }

    // Constructeur avec paramètres
    public Category(String code, String name) {
        this.code = code;
        this.name = name;
    }

    // Getter pour 'code'
    public String getCode() {
        return code;
    }

    // Setter pour 'code'
    public void setCode(String code) {
        this.code = code;
    }

    // Getter pour 'name'
    public String getName() {
        return name;
    }

    // Setter pour 'name'
    public void setName(String name) {
        this.name = name;
    }
}
