package com.tondoy.sgnnnews.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    private String id;
//    private String gid;

    private String name;
    private String department;
    private List<String> articles;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


    public User() {
    }

    public User(String name, String department, List<String> articles, LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.name = name;
        this.department = department;
        this.articles = articles;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;

    }



    public String getId() { return id; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public List<String> getArticles() {
        return articles;
    }

    public void setArticles(List<String> articles) {
        this.articles = articles;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(LocalDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
    }
}


