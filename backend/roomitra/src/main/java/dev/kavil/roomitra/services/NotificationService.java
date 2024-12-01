package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.kavil.roomitra.models.Notifications;
import dev.kavil.roomitra.repository.NotificationsRepository;
import java.util.Date;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationsRepository notificationsRepository;

    public Notifications createNotification(String userId, String type, String content, boolean isRead) {
        Notifications notification = new Notifications();
        notification.setUserId(userId);
        notification.setType(Notifications.NotificationType.valueOf(type));
        notification.setContent(content);
        notification.setRead(isRead);
        notification.setCreatedAt(new Date());
        return notificationsRepository.save(notification);
    }

    public List<Notifications> getUserNotifications(String userId) {
        return notificationsRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void markAsRead(String notificationId) {
        Notifications notification = notificationsRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        notificationsRepository.save(notification);
    }

    public void markAllNotificationsAsRead(String userId) {
        List<Notifications> notifications = notificationsRepository.findByUserIdAndIsReadFalse(userId);
        for (Notifications notification : notifications) {
            notification.setRead(true);
        }
        notificationsRepository.saveAll(notifications);
    }
}