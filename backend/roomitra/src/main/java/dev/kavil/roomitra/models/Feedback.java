package dev.kavil.roomitra.models;

import java.util.Date;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "feedback")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {
    @Id
    private ObjectId id;
    private ObjectId giverId;
    private ObjectId receiverId;
    private int rating;
    private String comments;
    @CreatedDate
    private Date createdAt;
}
