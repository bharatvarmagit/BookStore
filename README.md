



# visit live website at https://bharatfullstack.github.io

# Summary
Online book store is a web application developed using Angular and Java Spring boot. The idea of this web application is to provide user interface to the customer where one can order book online .

# Features:

## Search by Books Category
### 1. Gives the ability to search books by category selected 
 ![alt text](https://github.com/bharatvarmagit/BookStore/blob/master/images/home.png "Seach by Category")
 ***
### 2. Display Details when you click on a Book
 ![alt text](https://github.com/bharatvarmagit/BookStore/blob/master/images/book_Details.png "Book_Details")
 ***
 ### 3. Gives the ability to search for books by entering Keyword in search box
 ![alt text](https://github.com/bharatvarmagit/BookStore/blob/master/images/search.png "Seach by Keyword")
 ***
 ### 4. Added Server Side Pagination using ng-bootstrap 
 #### ability to select page size .  data only loads as user navigates from page to page which makes it memory effecient
 ![alt text](https://github.com/bharatvarmagit/BookStore/blob/master/images/pagination.png "Pagination")
 ***
  ### 5. Added cart status component in the header to track the items added go cart by user
  #### uses subject to communicate the click events between components
  ![alt text](https://github.com/bharatvarmagit/BookStore/blob/master/images/cart-status.png "Cart-Status")
  ***
  ### 6. Added Checkout Page to see the items added and ability to remove items from the cart
  #### uses Behavior subjects to communicate the events between books and checkout components since 
  #### the checkout event would not be intialised when books component emitted click event.and hence we use behavior      subject to get the last event thrown by the book component before it was destroyed and replaced by checkout component 
  ![alt text](https://github.com/bharatvarmagit/BookStore/blob/master/images/checkout.png "Checkout")
  ***
  ### 7 Added authentication mechanism with user icon that displays name in the header component.
  #### added login and sign up components and menu option for users to see their orders history
 
  ![alt text](https://github.com/bharatvarmagit/BookStore/blob/master/images/log%20in.png "Checkout")  
  ![alt text](https://github.com/bharatvarmagit/BookStore/blob/master/images/logged%20in.png "Checkout")
   ![alt text](https://github.com/bharatvarmagit/BookStore/blob/master/images/sign%20up.png "Checkout")
   
   ### 8 added order history that sorts by newest order firsrt by default
  ![alt text](https://github.com/bharatvarmagit/BookStore/blob/master/images/orderhistory.png "Checkout")  
 
   ### 9 added filter option to filter book by price . using output event emitters
  ![alt text](https://github.com/bharatvarmagit/BookStore/blob/master/images/sortfilter.png "Checkout")  
 
 

# Technologies:

* Java 8
* Spring boot 
* Maven
* Spring Data Jpa
* Spring Data Rest
* MySQL Server
* Git 
* Angular 8
* Bootstrap 4
* jQuery 3
* HTML 5
* CSS 3
* Font awesome library 


# Tools:

* Eclipse 
* MySQl
* MySQL workbench
* Visual studio code
* Github

