package com.backend.backend.controller;

import com.backend.backend.model.User;
import com.backend.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    public UserController() {
    }

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> addUser(@RequestBody User user) {
        try {
            userService.createUser(user);
            return ResponseEntity.ok("");

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());

        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Validated @RequestBody User user) {
        String token = userService.authenticateUser(user.getEmail(), user.getPassword());

        if (token != null) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("");
        }
    }

}
