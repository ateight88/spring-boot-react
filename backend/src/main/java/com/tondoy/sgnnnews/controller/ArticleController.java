package com.tondoy.sgnnnews.controller;

import com.tondoy.sgnnnews.model.User;
import com.tondoy.sgnnnews.model.Article;
import com.tondoy.sgnnnews.repository.ArticleRepository;
import com.tondoy.sgnnnews.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ArticleController {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @GetMapping("/articles")
    public ResponseEntity<List<Article>> getAllArticles(@RequestParam(required = false) String title, String summary, String department) {
        try {
            Query query = new Query();

            if (StringUtils.hasText(title)) {
                String escapedTitle = Pattern.quote(title); // Escape special characters including spaces
                Criteria titleCriteria = Criteria.where("title").regex(escapedTitle, "i");
                query.addCriteria(titleCriteria);
            }

            if (StringUtils.hasText(summary)) {
                String escapedSummary = Pattern.quote(summary);
                Criteria summaryCriteria = Criteria.where("summary").regex(escapedSummary, "i");
                query.addCriteria(summaryCriteria);
            }

            if (StringUtils.hasText(department)) {
                String escapedDepartment = Pattern.quote(department);
                Criteria departmentCriteria = Criteria.where("department").regex(escapedDepartment, "i");
                query.addCriteria(departmentCriteria);
            }

            List<Article> articles = mongoTemplate.find(query, Article.class);


            if (articles.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(articles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/articles/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable("id") String id) {
        Optional<Article> articleData = articleRepository.findById(id);

        if (articleData.isPresent()) {
            return new ResponseEntity<>(articleData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/articles")
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        try {
            LocalDateTime currentDateTime = LocalDateTime.now();
            article.setCreatedAt(currentDateTime);

            Article _article = new Article(article.getDepartment(), article.getTitle(), article.getSummary(), article.getFull(), false, article.getNumberOfReads(), article.getCreatedBy(), article.getCreatedAt(), article.getModifiedAt());

            // Update the User's articles array with the article's ID
            String userId = _article.getCreatedBy();
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                // Get the department from the user object
                String department = user.getDepartment();

                // Set the department in the article object
                article.setDepartment(department);

                // Save the article to the articleRepository
                _article = articleRepository.save(article);
                user.getArticles().add(_article.getId());
                userRepository.save(user);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(_article, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/articles/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable("id") String id, @RequestBody Article article) {
        Optional<Article> articleData = articleRepository.findById(id);

        if (articleData.isPresent()) {
            Article _article = articleData.get();
            _article.setTitle(article.getTitle());
            _article.setSummary(article.getSummary());
            _article.setFull(article.getFull());
            _article.setPublished(article.isPublished());
            _article.setNumberOfReads(article.getNumberOfReads());
            _article.setModifiedAt(LocalDateTime.now());
            return new ResponseEntity<>(articleRepository.save(_article), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/article/{id}")
    public ResponseEntity<Article> updateArticleRead(@PathVariable("id") String id, @RequestBody Article article) {
        Optional<Article> articleData = articleRepository.findById(id);

        if (articleData.isPresent()) {
            Article _article = articleData.get();
            _article.setNumberOfReads(article.getNumberOfReads());
            _article.setModifiedAt(LocalDateTime.now());
            return new ResponseEntity<>(articleRepository.save(_article), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<HttpStatus> deleteArticle(@PathVariable("id") String id) {
        try {
            Optional<Article> articleOptional = articleRepository.findById(id);

            if (articleOptional.isPresent()) {
                Article article = articleOptional.get();

                // Get the user associated with the article
                String userId = article.getCreatedBy();
                Optional<User> userOptional = userRepository.findById(userId);

                if (userOptional.isPresent()) {
                    User user = userOptional.get();

                    // Remove the article from the user's articles array
                    user.getArticles().remove(article.getId());
                    userRepository.save(user);
                }

                articleRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/articles")
    public ResponseEntity<HttpStatus> deleteAllArticles() {
        try {
            articleRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/articles/published")
    public ResponseEntity<List<Article>> findByPublished() {
        try {
            List<Article> articles = articleRepository.findByPublished(true);

            if (articles.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(articles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/articles/title")
    public ResponseEntity<List<Article>> findByTitle(@RequestParam("title") String title) {
        try {
            List<Article> articles = articleRepository.findByTitleContaining(title);

            if (articles.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(articles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/articles/summary")
    public ResponseEntity<List<Article>> findBySummary(@RequestParam("summary") String summary) {
        try {
            List<Article> articles = articleRepository.findBySummaryContaining(summary);

            if (articles.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(articles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/articles/department")
    public ResponseEntity<List<Article>> findByDepartment(@RequestParam("department") String department) {
        try {
            List<Article> articles = articleRepository.findByDepartmentContaining(department);

            if (articles.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(articles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
