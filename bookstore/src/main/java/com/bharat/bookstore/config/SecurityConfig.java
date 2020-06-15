package com.bharat.bookstore.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.bharat.bookstore.jwt.JwtTokenVerifier;
import com.bharat.bookstore.jwt.JwtUsernamePasswordAuthFilter;
import com.bharat.bookstore.repository.MyUserDetailsService;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	MyUserDetailsService userDetailsService;
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub
		http.
			sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).
			and().
			addFilter(new JwtUsernamePasswordAuthFilter(authenticationManager())).
			addFilterAfter(new JwtTokenVerifier() , JwtUsernamePasswordAuthFilter.class).
//			requiresChannel().antMatchers("/**").requiresSecure().and().
			csrf().disable().cors().and()
			
			.authorizeRequests()
			.antMatchers("/","index","/css/*","/js/*","/api/**").permitAll()
	
		.anyRequest()
		.authenticated();// anyone can access /quests/**
        
	
		
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// TODO Auto-generated method stub
		auth.userDetailsService(userDetailsService).passwordEncoder(encoder);
	}
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		
	    CorsConfiguration configuration = new CorsConfiguration();
	    configuration.setAllowedOrigins(Collections.singletonList("*")); // todo properties by environment
	    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"));
	    configuration.setAllowedHeaders(Arrays.asList("X-Requested-With", "Origin", "Content-Type", "Accept", "Authorization","WithCredentials"));
	    configuration.addExposedHeader("Authorization");
	    configuration.setExposedHeaders(Collections.singletonList("Authorization"));
	    configuration.setAllowCredentials(true);
	
	    org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);
	    return source;
	}
	
	

}
