package dev.kavil.roomitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import dev.kavil.roomitra.models.RoomDescription;
import dev.kavil.roomitra.services.RoomDescriptionService;
import dev.kavil.roomitra.services.S3Service;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

/**
 * REST Controller for managing room descriptions
 * Handles CRUD operations for room details provided by room providers
 */
@RestController
@RequestMapping("/api/v1/room-description")
public class RoomDescriptionController {
    @Autowired
    private RoomDescriptionService roomDescriptionService;

    @Autowired
    private S3Service s3Service;

    /**
     * Creates a new room description
     * 
     * @param roomDescription The room description details
     * @return ResponseEntity containing the saved room description
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createRoomDescription(
            @RequestParam("roomData") String roomDataJson,
            @RequestParam(value = "photos", required = false) List<MultipartFile> photos) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            RoomDescription roomData = mapper.readValue(roomDataJson, RoomDescription.class);

            if (photos != null && !photos.isEmpty()) {
                List<String> photoUrls = new ArrayList<>();
                for (MultipartFile photo : photos) {
                    String photoUrl = s3Service.uploadFile(photo, "rooms");
                    photoUrls.add(photoUrl);
                }
                roomData.setPhotoUrls(photoUrls);
            }

            RoomDescription savedDescription = roomDescriptionService.createRoomDescription(roomData);
            return ResponseEntity.ok(savedDescription);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Invalid room data format: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating room description: " + e.getMessage());
        }
    }

    /**
     * Retrieves all room descriptions for a specific provider
     * 
     * @param providerId The ID of the room provider
     * @return ResponseEntity containing list of room descriptions
     */
    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<RoomDescription>> getRoomDescriptionsByProviderId(@PathVariable String providerId) {
        List<RoomDescription> descriptions = roomDescriptionService.getRoomDescriptionsByProviderId(providerId);
        return ResponseEntity.ok(descriptions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomDescription> getRoomDescription(@PathVariable String id) {
        Optional<RoomDescription> description = roomDescriptionService.getRoomDescriptionById(id);
        return description.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoomDescription(
            @PathVariable String id,
            @RequestParam("roomData") String roomDataJson,
            @RequestParam(value = "photos", required = false) List<MultipartFile> photos) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            RoomDescription roomData = mapper.readValue(roomDataJson, RoomDescription.class);

            if (photos != null && !photos.isEmpty()) {
                List<String> photoUrls = new ArrayList<>();
                for (MultipartFile photo : photos) {
                    String photoUrl = s3Service.uploadFile(photo, "rooms");
                    photoUrls.add(photoUrl);
                }
                roomData.setPhotoUrls(photoUrls);
            }

            RoomDescription updatedDescription = roomDescriptionService.updateRoomDescription(id, roomData);
            if (updatedDescription == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updatedDescription);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body("Invalid room data format: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating room description: " + e.getMessage());
        }
    }
}
