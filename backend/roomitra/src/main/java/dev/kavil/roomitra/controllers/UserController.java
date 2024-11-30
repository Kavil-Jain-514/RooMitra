package dev.kavil.roomitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import java.net.MalformedURLException;

import dev.kavil.roomitra.models.RoomProviders;
import dev.kavil.roomitra.models.RoomSeekers;
import dev.kavil.roomitra.services.UserService;
import dev.kavil.roomitra.services.S3Service;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private S3Service s3Service;

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
            return ResponseEntity.ok(seeker);
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }

    // Login for RoomProvider
    @PostMapping("/login/provider")
    public ResponseEntity<?> loginRoomProvider(@RequestBody Map<String, String> credentials) {
        RoomProviders provider = userService.authenticateRoomProvider(credentials.get("email"),
                credentials.get("password"));
        if (provider != null) {
            return ResponseEntity.ok(provider);
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

    @GetMapping("/details/{userType}/{userId}")
    public ResponseEntity<?> getUserDetails(@PathVariable String userType, @PathVariable String userId) {
        try {
            if ("roomseeker".equalsIgnoreCase(userType)) {
                return ResponseEntity.ok(userService.getRoomSeekerDetails(userId));
            } else if ("roomprovider".equalsIgnoreCase(userType)) {
                return ResponseEntity.ok(userService.getRoomProviderDetails(userId));
            }
            return ResponseEntity.badRequest().body("Invalid user type");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching user details");
        }
    }

    @PatchMapping("/update-bio/{userType}/{userId}")
    public ResponseEntity<?> updateUserBio(
            @PathVariable String userType,
            @PathVariable String userId,
            @RequestBody Map<String, String> bioData) {
        try {
            String bio = bioData.get("bio");
            if ("roomseeker".equalsIgnoreCase(userType)) {
                return ResponseEntity.ok(userService.updateRoomSeekerBio(userId, bio));
            } else if ("roomprovider".equalsIgnoreCase(userType)) {
                return ResponseEntity.ok(userService.updateRoomProviderBio(userId, bio));
            }
            return ResponseEntity.badRequest().body("Invalid user type");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating bio");
        }
    }

    @GetMapping("/name/{userType}/{userId}")
    public ResponseEntity<?> getUserName(@PathVariable String userType, @PathVariable String userId) {
        try {
            if ("roomseeker".equalsIgnoreCase(userType)) {
                return ResponseEntity.ok(userService.getRoomSeekerName(userId));
            } else if ("roomprovider".equalsIgnoreCase(userType)) {
                return ResponseEntity.ok(userService.getRoomProviderName(userId));
            }
            return ResponseEntity.badRequest().body("Invalid user type");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching user name");
        }
    }

    @GetMapping("/seekers")
    public ResponseEntity<?> getAllRoomSeekers() {
        try {
            List<RoomSeekers> seekers = userService.getAllRoomSeekers();
            return ResponseEntity.ok(seekers);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching room seekers");
        }
    }

    @GetMapping("/providers")
    public ResponseEntity<?> getAllRoomProviders() {
        try {
            List<RoomProviders> providers = userService.getAllRoomProviders();
            return ResponseEntity.ok(providers);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching room providers");
        }
    }

    @GetMapping("/providers-with-rooms")
    public ResponseEntity<?> getAllRoomProvidersWithRooms() {
        try {
            List<Map<String, Object>> providersWithRooms = userService.getAllRoomProvidersWithRooms();
            return ResponseEntity.ok(providersWithRooms);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching room providers with rooms");
        }
    }

    @PostMapping(value = "/upload-photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadProfilePhoto(
            @RequestPart("file") MultipartFile file,
            @RequestParam("email") String email) {
        try {
            String fileUrl = s3Service.uploadFile(file, "users");
            userService.updateProfilePhoto(email, fileUrl);
            Map<String, String> response = new HashMap<>();
            response.put("photoUrl", fileUrl);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to upload photo: " + e.getMessage());
        }
    }

    // Add a GET endpoint to serve files
    @GetMapping("/uploads/profile-photos/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(System.getProperty("user.dir") + "/uploads/profile-photos/" + filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
