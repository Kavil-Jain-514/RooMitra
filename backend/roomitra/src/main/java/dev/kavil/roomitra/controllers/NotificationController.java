package dev.kavil.roomitra.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.kavil.roomitra.models.Notifications;
import dev.kavil.roomitra.services.NotificationService;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ResponseEntity<?> createNotification(@RequestBody Notifications notification) {
        try {
            Notifications savedNotification = notificationService.createNotification(
                    notification.getUserId(),
                    notification.getType().toString(),
                    notification.getContent(),
                    false);
            return ResponseEntity.ok(savedNotification);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating notification: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserNotifications(@PathVariable String userId) {
        try {
            List<Notifications> notifications = notificationService.getUserNotifications(userId);
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching notifications: " + e.getMessage());
        }
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<?> markAsRead(@PathVariable String notificationId) {
        try {
            notificationService.markAsRead(notificationId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error marking notification as read: " + e.getMessage());
        }
    }
}
