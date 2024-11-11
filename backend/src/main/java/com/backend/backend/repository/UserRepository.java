package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}