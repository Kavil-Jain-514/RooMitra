package dev.kavil.roomitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.kavil.roomitra.models.RoomProviders;
import dev.kavil.roomitra.models.RoomSeekers;
import dev.kavil.roomitra.services.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

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
    public ResponseEntity<?> loginRoomSeeker(@RequestParam String email, @RequestParam String password) {
        RoomSeekers seeker = userService.authenticateRoomSeeker(email, password);
        if (seeker != null) {
            return ResponseEntity.ok(seeker);
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }

    // Login for RoomProvider
    @PostMapping("/login/provider")
    public ResponseEntity<?> loginRoomProvider(@RequestParam String email, @RequestParam String password) {
        RoomProviders provider = userService.authenticateRoomProvider(email, password);
        if (provider != null) {
            return ResponseEntity.ok(provider);
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
