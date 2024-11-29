package dev.kavil.roomitra.models;

import java.util.Date;
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
    private String _id;
    private String matchId;
    private String senderId;
    private String recipientId;
    private String messageText;
    @CreatedDate
    private Date sentAt;
    private Date readAt;
}
