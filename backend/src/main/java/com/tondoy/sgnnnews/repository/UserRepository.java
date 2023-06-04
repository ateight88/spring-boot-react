package com.tondoy.sgnnnews.repository;

import com.tondoy.sgnnnews.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByDepartmentContaining(String department);
}
