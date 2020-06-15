package com.bharat.bookstore.jwt;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.bharat.bookstore.model.SingupForm;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUsernamePasswordAuthFilter extends UsernamePasswordAuthenticationFilter{


	private AuthenticationManager authenticationManager;
	
	@Autowired
	public JwtUsernamePasswordAuthFilter(AuthenticationManager authenticationManager) {
		super();
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException
	{
		
		try 
			{
			SingupForm authRequest=new ObjectMapper().readValue(request.getInputStream(), SingupForm.class);
			
			Authentication authentication=new UsernamePasswordAuthenticationToken(
				authRequest.getUsername(), authRequest.getPassword());
			
			Authentication authenticate=authenticationManager.authenticate(authentication);
			
			return authenticate;
			} 
		catch (IOException e)
			{
			
			throw new RuntimeException(e);
			}
		
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException 
	{
		
		String jwtKey="asdfknksngdsNVLSNMDVLKmlmlmkldmalkmklmsdfsfdasdfsdfKSADasdgas";
		String token=Jwts.builder().
					setSubject(authResult.getName()).
					claim("authorities", authResult.getAuthorities()).
					setIssuedAt(new Date()).
					setExpiration(java.sql.Date.valueOf(LocalDate.now().plusWeeks(2))).
					signWith(Keys.hmacShaKeyFor(jwtKey.getBytes())).
					compact();
		response.addHeader("Authorization", "Bearer "+token);
		
		
	}
	
		

}
