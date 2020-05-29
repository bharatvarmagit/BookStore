package com.bharat.bookstore.controllers;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bharat.bookstore.model.Book;
import com.bharat.bookstore.model.SingupForm;
import com.bharat.bookstore.model.User;
import com.bharat.bookstore.repository.BookRepository;
import com.bharat.bookstore.repository.UserRepository;

@RestController
@RequestMapping("/")
public class UserController {
	
	@Autowired
	BookRepository bookRepo;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/")
	public String logIn(Principal principal) {
		
		return principal.getName();
	}
	@Transactional
	@PostMapping("/signup")
	public String signUp(@RequestBody SingupForm  data) {
		
		String username=data.getUsername();
		String password=data.getPassword();
		System.out.println("inside signup controller retrieved username as "+username+" password as "+password);
		
		Book book=bookRepo.getOne(1L);
		Map<Book,Integer> userBook= new HashMap<Book,Integer>();
		userBook.put(book, 1);
		User newUser=new User(username, encoder.encode(password), true, " ", "USER",userBook);
	
		userRepo.save(newUser);
		return "sucesss";
		
		
	}

}
