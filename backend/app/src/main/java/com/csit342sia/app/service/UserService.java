package com.csit342sia.app.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csit342sia.app.entity.User;
import com.csit342sia.app.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository uRepo;

    //Create
    public User createUser(User user){
        return uRepo.save(user);
    }

    //Read
    public User getUserById(Long id){
        return uRepo.findById(id).orElse(null);
    }

    //Update
    public User updateUser(Long id, User updatedUser){
        User existingUser = uRepo.findById(id).orElseThrow(() -> new NoSuchElementException("User not found"));
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setRole(updatedUser.getRole());
        existingUser.setIsActive(updatedUser.isActive());
        return uRepo.save(existingUser);
    }

    //Delete
    public void deleteUser(Long id){
        uRepo.deleteById(id);
    }
}
