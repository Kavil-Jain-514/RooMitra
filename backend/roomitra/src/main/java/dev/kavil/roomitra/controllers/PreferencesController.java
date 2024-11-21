package dev.kavil.roomitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.kavil.roomitra.models.SeekerPreferences;
import dev.kavil.roomitra.services.PreferencesService;
import dev.kavil.roomitra.models.ProviderPreferences;

@RestController
@RequestMapping("/api/v1")
public class PreferencesController {
    @Autowired
    private PreferencesService preferencesService;

    @PostMapping("/seeker/preferences")
    public ResponseEntity<?> saveSeekerPreferences(@RequestBody SeekerPreferences request) {
        try {
            preferencesService.saveSeekerPreferences(request);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving preferences");
        }
    }

    @PostMapping("/provider/preferences")
    public ResponseEntity<?> saveProviderPreferences(@RequestBody ProviderPreferences request) {
        try {
            System.out.println("Received request: " + request);
            preferencesService.saveProviderPreferences(request);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error saving preferences: " + e.getMessage());
        }
    }
}