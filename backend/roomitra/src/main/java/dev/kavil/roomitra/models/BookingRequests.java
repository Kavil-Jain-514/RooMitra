package dev.kavil.roomitra.models;

import java.util.Date;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "bookingRequests")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequests {
    @Id
    private String _id;
    private String roomSeekerId;
    private String roomProviderId;
    private String roomDescriptionId;

    public enum BookingStatus {
        PENDING, ACCEPT, REJECTED
    }

    private BookingStatus status;
    @CreatedDate
    private Date requestedAt;
    private Date updatedAt;
}
