package com.bharat.bookstore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bharat.bookstore.model.User;

public interface UserRepository extends JpaRepository<User, String> {
	
	Optional<User> findByUsername(String username);
}
