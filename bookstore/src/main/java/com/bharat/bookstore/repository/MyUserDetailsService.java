package com.bharat.bookstore.repository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bharat.bookstore.model.MyUserDetails;
import com.bharat.bookstore.model.User;

@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
	UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		System.out.println("finding "+username+" in user repository");
		Optional<User> user=userRepo.findByUsername(username);
		
		user.orElseThrow(()-> new UsernameNotFoundException(username + "  not found") );
		return user.map(MyUserDetails::new).get();
	}

}
