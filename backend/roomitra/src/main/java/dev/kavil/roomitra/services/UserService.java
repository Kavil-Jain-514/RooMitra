package dev.kavil.roomitra.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.kavil.roomitra.models.User;
import dev.kavil.roomitra.repository.UserRepository;
import dev.kavil.roomitra.utils.PasswordUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists.");
        }
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("User with this username already exists.");
        }
        // Hash the password before saving
        user.setPassword(PasswordUtil.hashPassword(user.getPassword()));
        return userRepository.save(user);
    }

    public User loginUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && PasswordUtil.verifyPassword(password, user.get().getPassword())) {
            return user.get();
        } else {
            throw new RuntimeException("Invalid username or password.");
        }
    }

}
