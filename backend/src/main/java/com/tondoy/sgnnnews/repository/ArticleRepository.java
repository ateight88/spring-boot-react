package com.tondoy.sgnnnews.repository;

import com.tondoy.sgnnnews.model.Article;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ArticleRepository extends MongoRepository<Article, String> {

    List<Article> findByPublished(boolean published);
    List<Article> findByTitleContaining(String title);
    List<Article> findBySummaryContaining(String summary);
    List<Article> findByDepartmentContaining(String department);
    List<Article> findAllById(String userId);

}
