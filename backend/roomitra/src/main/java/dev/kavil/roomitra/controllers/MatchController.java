package dev.kavil.roomitra.controllers;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.kavil.roomitra.models.Matches;
import dev.kavil.roomitra.services.MatchService;
import dev.kavil.roomitra.services.NotificationService;
import dev.kavil.roomitra.services.CompatibilityService;
import dev.kavil.roomitra.services.PreferencesService;
import dev.kavil.roomitra.models.SeekerPreferences;
import dev.kavil.roomitra.models.ProviderPreferences;

@RestController
@RequestMapping("/api/v1/matches")
public class MatchController {
    @Autowired
    private MatchService matchService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private CompatibilityService compatibilityService;
    @Autowired
    private PreferencesService preferencesService;

    @PostMapping("/request")
    public ResponseEntity<?> createMatchRequest(@RequestBody Matches match) {
        try {
            // Validate that both seeker and provider IDs are present
            if (match.getSeekerId() == null || match.getProviderId() == null) {
                return ResponseEntity.badRequest().body("Both seeker and provider IDs are required");
            }

            Matches savedMatch = matchService.createMatch(match);

            // Calculate compatibility score
            SeekerPreferences seekerPrefs = preferencesService.getSeekerPreferences(match.getSeekerId());
            ProviderPreferences providerPrefs = preferencesService.getProviderPreferences(match.getProviderId());
            double compatibilityScore = compatibilityService.calculateCompatibilityScore(seekerPrefs, providerPrefs);

            // Add score to response
            Map<String, Object> response = new HashMap<>();
            response.put("match", savedMatch);
            response.put("compatibilityScore", compatibilityScore);

            // Create notification for the recipient
            String recipientId = match.getRequestedBy().equals(match.getSeekerId())
                    ? match.getProviderId()
                    : match.getSeekerId();

            notificationService.createNotification(
                    recipientId,
                    "CONNECTION_REQUEST",
                    String.format("New connection request! Compatibility Score: %.1f%%", compatibilityScore),
                    false);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating match request: " + e.getMessage());
        }
    }

    @PutMapping("/{matchId}")
    public ResponseEntity<?> respondToMatch(
            @PathVariable String matchId,
            @RequestParam String status,
            @RequestBody Map<String, String> body) {
        try {
            Matches updatedMatch = matchService.updateMatchStatus(matchId, status);

            // Notify the provider about the seeker's response
            notificationService.createNotification(
                    updatedMatch.getProviderId(),
                    "CONNECTION_RESPONSE",
                    body.get("message"),
                    false);

            return ResponseEntity.ok(updatedMatch);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error responding to match: " + e.getMessage());
        }
    }

    @GetMapping("/pending/{userId}")
    public ResponseEntity<?> getPendingMatches(@PathVariable String userId) {
        try {
            List<Matches> pendingMatches = matchService.getPendingMatchesByUserId(userId);
            return ResponseEntity.ok(pendingMatches);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching pending matches: " + e.getMessage());
        }
    }

    @GetMapping("/connection-status/{userId1}/{userId2}")
    public ResponseEntity<?> getConnectionStatus(
            @PathVariable String userId1,
            @PathVariable String userId2) {
        try {
            Map<String, Object> status = matchService.getDetailedConnectionStatus(userId1, userId2);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error checking connection status: " + e.getMessage());
        }
    }
}
