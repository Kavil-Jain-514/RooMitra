package dev.kavil.roomitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;

import dev.kavil.roomitra.models.RoomProviders;
import dev.kavil.roomitra.models.RoomSeekers;
import dev.kavil.roomitra.services.UserService;
import dev.kavil.roomitra.utils.JWTUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private JWTUtil jwtUtil;

    // Register RoomSeeker
    @PostMapping("/register/seeker")
    public ResponseEntity<?> registerRoomSeeker(@RequestBody RoomSeekers seeker) {
        return ResponseEntity.ok(userService.registerRoomSeeker(seeker));
    }

    // Register RoomProvider
    @PostMapping("/register/provider")
    public ResponseEntity<?> registerRoomProvider(@RequestBody RoomProviders provider) {
        return ResponseEntity.ok(userService.registerRoomProvider(provider));
    }

    // Login for RoomSeeker
    @PostMapping("/login/seeker")
    public ResponseEntity<?> loginRoomSeeker(@RequestBody Map<String, String> credentials) {
        RoomSeekers seeker = userService.authenticateRoomSeeker(credentials.get("email"), credentials.get("password"));
        if (seeker != null) {
            String token = jwtUtil.generateToken(credentials.get("email"));
            Map<String, Object> response = new HashMap<>();
            response.put("user", seeker);
            response.put("token", token);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }

    // Login for RoomProvider
    @PostMapping("/login/provider")
    public ResponseEntity<?> loginRoomProvider(@RequestBody Map<String, String> credentials) {
        RoomProviders provider = userService.authenticateRoomProvider(credentials.get("email"),
                credentials.get("password"));
        if (provider != null) {
            String token = jwtUtil.generateToken(credentials.get("email"));
            Map<String, Object> response = new HashMap<>();
            response.put("user", provider);
            response.put("token", token);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }

    // Logout endpoint
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // Get the Authorization header
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            // Add the token to blacklist or invalidate it
            userService.invalidateToken(token);
            return ResponseEntity.ok().body("Logged out successfully");
        }

        return ResponseEntity.badRequest().body("No authentication token found");
    }

}
