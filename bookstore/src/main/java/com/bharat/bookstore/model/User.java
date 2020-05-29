package com.bharat.bookstore.model;

import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapKeyJoinColumn;

@Entity(name = "User")
public class User {
	@Id
	@Column(name = "username")
	private String username;
	@Column(name = "pass")
	private String password;
	@Column(name="address")
	private String address;
	private boolean active;
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public boolean getActive() {
		return active;
	}


	private String roles ;
	


	public Map<Book, Integer> getSavedBooks() {
		return savedBooks;
	}
	public void setSavedBooks(Map<Book, Integer> savedBooks) {
		this.savedBooks = savedBooks;
	}


	@ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "User_Books", 
      joinColumns = { @JoinColumn(name = "username")}  )
    @MapKeyJoinColumn(name = "Book_ID")
    @Column(name = "count")
	private Map<Book,Integer> savedBooks;
	
	
	public User() {
		super();
	}
	public User(String username, String password,Boolean active, String address,String roles, Map<Book, Integer> savedBooks) {
		
		this.active=active;
		this.username = username;
		this.password = password;
		this.address = address;
		this.roles=roles;
		this.savedBooks=savedBooks;
	}	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getRoles() {
		return roles;
	}
	public void setRoles(String roles) {
		this.roles = roles;
	}
	
	
	
	
}
