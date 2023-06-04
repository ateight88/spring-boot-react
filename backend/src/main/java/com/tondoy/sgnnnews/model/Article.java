package com.tondoy.sgnnnews.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "articles")
public class Article {
    @Id
    private String id;
    private String department;
    private String title;
    private String summary;
    private String full;
    private boolean published;
    private int numberOfReads;
    private String createdBy;


    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public Article() {

    }

    public Article(String department, String title, String summary, String full, boolean published, int numberOfReads, String createdBy, LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.department = department;
        this.title = title;
        this.summary = summary;
        this.full = full;
        this.published = published;
        this.numberOfReads = numberOfReads;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

    public String getId() {
        return id;
    }


    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getFull() {
        return full;
    }

    public void setFull(String full) {
        this.full = full;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean isPublished) {
        this.published = isPublished;
    }

    public int getNumberOfReads() {
        return numberOfReads;
    }

    public void setNumberOfReads(int numberOfReads) {
        this.numberOfReads = numberOfReads;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
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

    @Override
    public String toString() {
        return "Article [id=" + id + ", title=" + title + ", desc=" + summary + ", published=" + published  + ", createdBy=" + createdBy + "]";
    }
}

