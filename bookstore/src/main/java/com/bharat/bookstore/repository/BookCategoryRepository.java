package com.bharat.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bharat.bookstore.model.BookCategory;

public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {

}
