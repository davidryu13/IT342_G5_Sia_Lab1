package com.csit342sia.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.csit342sia.app.dto.request.LoginRequest;
import com.csit342sia.app.dto.request.RegisterRequest;
import com.csit342sia.app.dto.response.AuthResponse;
import com.csit342sia.app.dto.response.UserResponse;
import com.csit342sia.app.entity.User;
import com.csit342sia.app.repository.UserRepository;
import com.csit342sia.app.security.JwtTokenProvider;


@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;  // Works with User entity
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    public AuthResponse login(LoginRequest request) {
        // Find user
        User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        // Generate token
        String token = tokenProvider.generateToken(user.getUsername(), user.getId());
        
        // Return response
        return new AuthResponse(token, UserResponse.fromEntity(user));
    }
    
    public UserResponse register(RegisterRequest request) {
        // Create user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        
        // Save user
        User savedUser = userRepository.save(user);
        
        return UserResponse.fromEntity(savedUser);
    }
}