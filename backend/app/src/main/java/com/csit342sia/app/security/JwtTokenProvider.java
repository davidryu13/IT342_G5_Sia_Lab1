package com.csit342sia.app.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private long expirationMs;
    
    // Get signing key
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
    
    // Generate JWT token (NEW WAY - Non-deprecated)
    public String generateToken(String username, Long userId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);
        
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        
        return Jwts.builder()
                .claims(claims)                    // ← NEW: Use claims() instead of setClaims()
                .subject(userId.toString())        // ← NEW: Use subject() instead of setSubject()
                .issuedAt(now)                     // ← NEW: Use issuedAt() instead of setIssuedAt()
                .expiration(expiryDate)            // ← NEW: Use expiration() instead of setExpiration()
                .signWith(getSigningKey())         // ← NEW: Use signWith(key) instead of signWith(key, algorithm)
                .compact();
    }
    
    // Extract user ID from token
    public Long getUserIdFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return Long.parseLong(claims.getSubject());
    }
    
    // Extract username from token
    public String getUsernameFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return claims.get("username", String.class);
    }
    
    // Validate token
    public boolean validateToken(String token) {
        try {
            Jwts.parser()                          // ← NEW: Use parser() instead of parserBuilder()
                    .verifyWith(getSigningKey())   // ← NEW: Use verifyWith() instead of setSigningKey()
                    .build()
                    .parseSignedClaims(token);     // ← NEW: Use parseSignedClaims() instead of parseClaimsJws()
            
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Log the exception
            System.err.println("JWT validation failed: " + e.getMessage());
            return false;
        }
    }
    
    // Get all claims from token
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();                     // ← NEW: Use getPayload() instead of getBody()
    }
    
    // Check if token is expired (optional helper)
    public boolean isTokenExpired(String token) {
        Date expiration = getAllClaimsFromToken(token).getExpiration();
        return expiration.before(new Date());
    }
}