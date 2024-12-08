package dev.kavil.roomitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dev.kavil.roomitra.models.Messages;
import dev.kavil.roomitra.services.MessagesService;
import dev.kavil.roomitra.services.NotificationService;

@RestController
@RequestMapping("/api/v1/messages")
public class MessagesController {
    @Autowired
    private MessagesService messagesService;

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody Messages message) {
        try {
            Messages savedMessage = messagesService.sendMessage(message);

            // Send notification to recipient
            notificationService.createNotification(
                    message.getRecipientId(),
                    "NEW_MESSAGE",
                    "You have received a new message",
                    false);

            return ResponseEntity.ok(savedMessage);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending message: " + e.getMessage());
        }
    }

    @GetMapping("/{userId1}/{userId2}")
    public ResponseEntity<?> getConversation(
            @PathVariable String userId1,
            @PathVariable String userId2) {
        try {
            return ResponseEntity.ok(messagesService.getConversation(userId1, userId2));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching conversation: " + e.getMessage());
        }
    }

    @PutMapping("/{messageId}/read")
    public ResponseEntity<?> markAsRead(@PathVariable String messageId) {
        try {
            messagesService.markAsRead(messageId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error marking message as read: " + e.getMessage());
        }
    }
}