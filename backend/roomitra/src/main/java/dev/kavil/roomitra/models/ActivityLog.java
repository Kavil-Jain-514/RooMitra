package dev.kavil.roomitra.models;

import java.util.Date;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "activityLog")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityLog {
    @Id
    private ObjectId id;
    private ObjectId userId; // Reference to the user (RoomSeeker or RoomProvider)

    public enum ActivityType {
        MATCH, MESSAGE, PROFILE_UPDATE, RATING, FEEDBACK
    }

    private ActivityType activityType;
    private String description;
    @CreatedDate
    private Date createdAt;
}
