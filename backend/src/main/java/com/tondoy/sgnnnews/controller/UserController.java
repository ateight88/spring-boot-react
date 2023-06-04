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

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    ArticleRepository articleRepository;
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String name) {
        try {
            Query query = new Query();

            if (StringUtils.hasText(name)) {
                String escapedName = Pattern.quote(name); // Escape special characters including spaces
                Criteria nameCriteria = Criteria.where("name").regex(escapedName, "i");
                query.addCriteria(nameCriteria);
            }
//            List<User> users = userRepository.findAll();
            List<User> users = mongoTemplate.find(query, User.class);


            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String id) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/department")
    public ResponseEntity<List<User>> findByDepartment(@RequestParam("department") String department) {
        try {
            List<User> users = userRepository.findByDepartmentContaining(department);

            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{userId}/articles")
    public ResponseEntity<List<Article>> getArticlesByUserId(@PathVariable("userId") String userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
//            Optional<User> userOptional = userRepository.findByGid(userId);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                List<String> articleIds = user.getArticles();

                Criteria criteria = Criteria.where("id").in(articleIds);
                Query query = new Query(criteria);

                List<Article> articles = mongoTemplate.find(query, Article.class);

                if (articles.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }

                return new ResponseEntity<>(articles, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            LocalDateTime currentDateTime = LocalDateTime.now();
            user.setCreatedAt(currentDateTime);

            User _user = userRepository.save(new User(user.getName(), user.getDepartment(), user.getArticles(), user.getCreatedAt(), user.getModifiedAt()));
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            User _user = userData.get();
            _user.setName(user.getName());
            _user.setDepartment(user.getDepartment());
            _user.setArticles(user.getArticles());
            _user.setModifiedAt(LocalDateTime.now());
            return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") String id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/users")
    public ResponseEntity<HttpStatus> deleteAllUsers() {
        try {
            userRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
