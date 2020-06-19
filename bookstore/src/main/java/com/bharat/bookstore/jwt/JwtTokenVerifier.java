package com.bharat.bookstore.jwt;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.util.Strings;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtTokenVerifier extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String authorizationHeader=request.getHeader("authorization");
		if(Strings.isBlank(authorizationHeader)||Strings.isEmpty(authorizationHeader)|| !authorizationHeader.startsWith("Bearer "))
		{
			filterChain.doFilter(request, response);
			return;
		}
		try {
			String jwtKey="asdfknksngdsNVLSNMDVLKmlmlmkldmalkmklmsdfsfdasdfsdfKSADasdgas";
			String token=authorizationHeader.replace("Bearer " ,"");
			Jws<Claims> jwsClaims=Jwts.parserBuilder()
					.setSigningKey(Keys.hmacShaKeyFor(jwtKey.getBytes()))
					.build()
					.parseClaimsJws(token);
			Claims body=jwsClaims.getBody();
			String username=body.getSubject();
			List<Map<String,String>> authorities=(List<Map<String,String>>) body.get("authorities");
			Set<SimpleGrantedAuthority> grantedAuthorities=authorities.stream()
			.map(m->new SimpleGrantedAuthority(m.get("authority"))).collect(Collectors.toSet());
			
			Authentication authentication=new UsernamePasswordAuthenticationToken(username, null,grantedAuthorities);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
		} catch (JwtException e) {
			throw new IllegalStateException("Token cannot be trusted");
		}
		filterChain.doFilter(request, response);
	}
	
	

}
