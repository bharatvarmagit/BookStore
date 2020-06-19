package com.bharat.bookstore.model;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyJoinColumn;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author bharat
 *
 */
@Entity(name = "Orders")
 public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private int id;
	
	@ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "User_Order", 
      joinColumns = { @JoinColumn(name = "id")}  )
    @MapKeyJoinColumn(name = "Book_ID")
    @Column(name = "quantity")
	 Map<Book,Integer> items;
	
	 @Temporal(TemporalType.TIMESTAMP)
	 private Date orderedOn;
	 
	 public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}
	private int totalPrice;
	 @JsonIgnore
	 @ManyToOne
	 @JoinColumn(name="user_id",nullable=false)
	 private User orderedBy;
	 
	public Order() {
		super();
	}
	
	public Order(Map<Book, Integer> items, User orderedBy,int price) {
		super();
		this.items = items;
		this.orderedBy = orderedBy;
		this.orderedOn=java.sql.Timestamp.valueOf(LocalDateTime.now());
		totalPrice=price;
	}
	public Order(Map<Book, Integer> items, User orderedBy) {
		super();
		this.items = items;
		this.orderedBy = orderedBy;
		this.orderedOn=java.sql.Timestamp.valueOf(LocalDateTime.now());
		
	}
	
	

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public Map<Book, Integer> getItems() {
		return items;
	}
	public void setItems(Map<Book, Integer> items) {
		this.items = items;
	}
	public Date getOrderedOn() {
		return orderedOn;
	}
	public void setOrderedOn(Date orderedOn) {
		this.orderedOn = orderedOn;
	}
	public User getOrderedBy() {
		return orderedBy;
	}
	public void setOrderedBy(User orderedBy) {
		this.orderedBy = orderedBy;
	}
	
	 
	 
	}
