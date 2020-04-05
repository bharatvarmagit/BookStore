package com.bharat.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bharat.bookstore.model.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}
