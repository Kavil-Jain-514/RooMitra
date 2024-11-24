package dev.kavil.roomitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.bson.types.ObjectId;

import dev.kavil.roomitra.models.RoomDescription;
import dev.kavil.roomitra.services.RoomDescriptionService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/room-description")
public class RoomDescriptionController {
    @Autowired
    private RoomDescriptionService roomDescriptionService;

    @PostMapping
    public ResponseEntity<RoomDescription> createRoomDescription(@RequestBody RoomDescription roomDescription) {
        RoomDescription savedDescription = roomDescriptionService.createRoomDescription(roomDescription);
        return ResponseEntity.ok(savedDescription);
    }

    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<RoomDescription>> getRoomDescriptionsByProviderId(@PathVariable String providerId) {
        List<RoomDescription> descriptions = roomDescriptionService.getRoomDescriptionsByProviderId(providerId);
        return ResponseEntity.ok(descriptions);
    }
}
