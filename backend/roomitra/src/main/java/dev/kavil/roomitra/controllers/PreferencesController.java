package dev.kavil.roomitra.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.kavil.roomitra.models.SeekerPreferences;
import dev.kavil.roomitra.services.CompatibilityService;
import dev.kavil.roomitra.services.PreferencesService;
import dev.kavil.roomitra.models.ProviderPreferences;
import dev.kavil.roomitra.services.UserService;

@RestController
@RequestMapping("/api/v1")
public class PreferencesController {
    @Autowired
    private PreferencesService preferencesService;

    @Autowired
    private CompatibilityService compatibilityService;

    @Autowired
    private UserService userService;

    @PostMapping("/seeker/preferences")
    public ResponseEntity<?> saveSeekerPreferences(@RequestBody SeekerPreferences request) {
        try {
            SeekerPreferences savedPreferences = preferencesService.saveSeekerPreferences(request);
            return ResponseEntity.ok(savedPreferences);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving preferences: " + e.getMessage());
        }
    }

    @PostMapping("/provider/preferences")
    public ResponseEntity<?> saveProviderPreferences(@RequestBody ProviderPreferences request) {
        try {
            ProviderPreferences savedPreferences = preferencesService.saveProviderPreferences(request);
            return ResponseEntity.ok(savedPreferences);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error saving preferences: " + e.getMessage());
        }
    }

    @GetMapping("/compatibility-score/{userId1}/{userId2}")
    public ResponseEntity<?> getCompatibilityScore(
            @PathVariable String userId1,
            @PathVariable String userId2) {
        try {
            // Determine which user is seeker and which is provider
            String seekerId, providerId;

            // Get user types from user service
            String user1Type = userService.getUserType(userId1);
            String user2Type = userService.getUserType(userId2);

            if (user1Type.equals("RoomSeeker") && user2Type.equals("RoomProvider")) {
                seekerId = userId1;
                providerId = userId2;
            } else if (user1Type.equals("RoomProvider") && user2Type.equals("RoomSeeker")) {
                seekerId = userId2;
                providerId = userId1;
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("error", true);
                response.put("message", "Invalid user types for compatibility calculation");
                return ResponseEntity.status(400).body(response);
            }

            boolean seekerPrefsExist = preferencesService.checkSeekerPreferencesExist(seekerId);
            boolean providerPrefsExist = preferencesService.checkProviderPreferencesExist(providerId);

            if (!seekerPrefsExist || !providerPrefsExist) {
                Map<String, Object> response = new HashMap<>();
                response.put("error", true);
                response.put("message",
                        !seekerPrefsExist ? "Seeker preferences not found."
                                : "Provider preferences not found.");
                return ResponseEntity.status(404).body(response);
            }

            SeekerPreferences seekerPrefs = preferencesService.getSeekerPreferences(seekerId);
            ProviderPreferences providerPrefs = preferencesService.getProviderPreferences(providerId);

            double score = compatibilityService.calculateCompatibilityScore(seekerPrefs, providerPrefs);

            Map<String, Object> response = new HashMap<>();
            response.put("compatibilityScore", score * 100); // Convert to percentage
            response.put("seekerId", seekerId);
            response.put("providerId", providerId);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", true);
            response.put("message", "Error calculating compatibility: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

}