package com.bharat.bookstore.controllers;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bharat.bookstore.model.Book;
import com.bharat.bookstore.model.Order;
import com.bharat.bookstore.model.SingupForm;
import com.bharat.bookstore.model.User;
import com.bharat.bookstore.repository.BookRepository;
import com.bharat.bookstore.repository.OrderRepository;
import com.bharat.bookstore.repository.UserRepository;


@RequestMapping("/")
@Transactional
@RestController
public class UserController {
	
	@Autowired
	OrderRepository orderRepo;
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
	@PostMapping("/placeorder")
	public Map<String,Set<Order>> placeOrder(@RequestBody Map<Integer, Integer> json,Principal principal,@RequestParam(name = "price") int price) {
		Optional<User> user=userRepo.findByUsername(principal.getName());
		user.orElseThrow(()->new UsernameNotFoundException("no user with username "+ principal.getName()));
		
		HashMap<Book,Integer> items=new HashMap<Book,Integer>();
		
		for (Map.Entry<Integer, Integer> ele: json.entrySet()) {
			
			Optional<Book> book=bookRepo.findById(new Long(ele.getKey()));

			items.put(book.get(),ele.getValue());
			
		}
		Order order=new Order(items,user.get(),price);
		orderRepo.save(order);
		Map<String,Set<Order>> map=new HashMap<String, Set<Order>>();
		map.put("orders:",user.get().getOrders());
	    return map;
	    
	}
	@GetMapping("/getorders")
	public Map<String,Set<Order>> getOrders(Principal principal){
		User user=userRepo.findByUsername(principal.getName()).get();
		Map<String,Set<Order>> map=new HashMap<String, Set<Order>>();
		map.put("orders:",user.getOrders());
	    return map;
		
	}
	@GetMapping("/getbookid")
	public int getBookId(@RequestParam(name = "name") String name) {
		return (int) bookRepo.findByName(name).getId();
	}
	@DeleteMapping("/deleteorder")
	public String deleteOrder(@RequestParam(name="orderId") int orderId) {
		orderRepo.deleteById(orderId);
		return "Y";
	}
	@DeleteMapping("/deleteorderitem")
	public String deleteorderitem(@RequestParam(name = "bookid") int bookId,@RequestParam(name = "orderid") int orderId)
	{
		Order order=orderRepo.findById(orderId).get();
		Book book=bookRepo.getOne(new Long(bookId));
		order.getItems().remove(book);
		return "Y";
		
	}

	}
