package dev.kavil.roomitra.model;

import java.util.Date;
import org.bson.types.ObjectId;
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
    private ObjectId id;                  
    private ObjectId roomSeekerId;        
    private ObjectId roomProviderId;      
    private ObjectId roomDescriptionId;
    public enum BookingStatus {
        PENDING, ACCEPT, REJECTED
    }   
    private BookingStatus status;
    @CreatedDate
    private Date requestedAt;             
    private Date updatedAt;               
}
