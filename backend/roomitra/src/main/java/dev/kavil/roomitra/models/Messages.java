package dev.kavil.roomitra.models;

import java.util.Date;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Messages {
    private ObjectId id;
    private ObjectId matchId;
    private ObjectId senderId;
    private ObjectId recipientId;
    private String messageText;
    @CreatedDate
    private Date sentAt;
    private Date readAt;
}
