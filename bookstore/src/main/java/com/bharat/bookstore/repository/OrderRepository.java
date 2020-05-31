package com.bharat.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bharat.bookstore.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
	
}
