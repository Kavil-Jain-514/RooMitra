package dev.kavil.roomitra.models;

import java.util.Date;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "notifications")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notifications {
    @Id
    private String _id;
    private String userId; // Reference to the user (RoomSeeker or RoomProvider)

    public enum NotificationType {
        NEW_MATCH, MATCH_STATUS, NEW_MESSAGE, NEW_BOOKING_REQUEST, BOOKING_STATUS, FEEDBACK, VERIFICATION_STATUS,
        NEW_LISTING, PROFILE_UPDATED, CONNECTION_REQUEST, CONNECTION_RESPONSE
    }

    private NotificationType type;
    private String content;
    private boolean isRead;
    @CreatedDate
    private Date createdAt;
}
