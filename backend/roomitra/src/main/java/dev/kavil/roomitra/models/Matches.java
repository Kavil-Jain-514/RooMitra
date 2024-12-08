package dev.kavil.roomitra.models;

import java.util.Date;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "matches")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Matches {
    private String _id;
    private String seekerId;
    private String providerId;
    private String requestedBy;

    public enum MatchStatus {
        PENDING, ACCEPT, REJECT
    }

    private MatchStatus status;
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date updatedAt;
    private Date lastInteractionAt; // Last interaction between seeker and provider
}
