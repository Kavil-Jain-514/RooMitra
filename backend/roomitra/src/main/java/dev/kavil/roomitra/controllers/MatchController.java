package dev.kavil.roomitra.controllers;

import java.util.List;
import java.util.Map;

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

@RestController
@RequestMapping("/api/v1/matches")
public class MatchController {
    @Autowired
    private MatchService matchService;
    @Autowired
    private NotificationService notificationService;

    @PostMapping("/request")
    public ResponseEntity<?> createMatchRequest(@RequestBody Matches match) {
        try {
            Matches savedMatch = matchService.createMatch(match);
            return ResponseEntity.ok(savedMatch);
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

            notificationService.createNotification(
                    updatedMatch.getSeekerId(),
                    "CONNECTION_RESPONSE",
                    body.get("message"),
                    true);

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
}
