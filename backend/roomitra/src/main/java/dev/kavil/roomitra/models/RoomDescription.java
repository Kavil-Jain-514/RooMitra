package dev.kavil.roomitra.models;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "roomDescription")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDescription {
    @Id
    private String _id; // Room description ID

    private String providerId; // Foreign key referring to RoomProviders

    private int sqft; // Square footage of the room
    private int rooms; // Number of rooms
    private boolean patio; // Does the room have a patio?
    private boolean washerDryer;

    public enum Stovetop {
        GAS, ELECTRIC
    }

    private Stovetop stovetop; // Type of stovetop (Gas or Electric)

    private int bath; // Number of bathrooms
    private int bed; // Number of bedrooms

    // Location Details
    private String locationId;

    private String societyDescription; // Society or community description
    private String comments; // Additional comments about the room
    private double ratings; // Average ratings for the room
    private Date availabilityDate;
    private boolean sharedRoom;
    private boolean petFriendly;
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date updatedAt;
}