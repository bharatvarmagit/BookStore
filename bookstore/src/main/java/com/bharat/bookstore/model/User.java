//package com.bharat.bookstore.model;
//
//import java.util.Set;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.Id;
//
//@Entity(name = "User")
//public class User {
//	@Id()
//	@Column(name = "username")
//	private String username;
//	@Column(name = "pass")
//	private String password;
//	@Column(name="address")
//	private String address;
//	private Set<String> roles;
//	
//	public User() {
//		super();
//	}
//	public User(String username, String password, String address,Set<String> roles) {
//		super();
//		this.username = username;
//		this.password = password;
//		this.address = address;
//		this.roles=roles;
//	}
//	public String getUsername() {
//		return username;
//	}
//	public void setUsername(String username) {
//		this.username = username;
//	}
//	public String getPassword() {
//		return password;
//	}
//	public void setPassword(String password) {
//		this.password = password;
//	}
//	public String getAddress() {
//		return address;
//	}
//	public void setAddress(String address) {
//		this.address = address;
//	}
//	public void setRoles(Set<String> roles) {
//		this.roles=roles;
//	}
//	Set<String> getRoles(){
//		return roles;
//	}
//}
