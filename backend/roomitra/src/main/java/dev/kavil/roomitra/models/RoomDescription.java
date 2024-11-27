package dev.kavil.roomitra.models;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model class representing room description details
 * Contains all information about a room listing
 */
@Document(collection = "roomDescription")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDescription {
    @Id
    private String _id;
    private String providerId;

    // Room specifications
    private int sqft;
    private int rooms;
    private int bath;
    private int bed;
    private int floor;

    // Location details
    private String streetName;
    private String apartmentNumber;
    private String city;
    private String zipcode;

    // Room type and availability
    public enum RoomType {
        SHARED, PERSONAL
    }

    private RoomType roomType;
    private Date availabilityDate;

    // Basic amenities
    private boolean patio;
    private boolean washerDryer;
    private boolean petFriendly;

    // Additional amenities
    public enum AcType {
        CENTRALIZED, SEPARATE, NONE
    }

    private AcType acType;

    public enum StoveType {
        FLAME, ELECTRIC, NONE
    }

    private StoveType stoveType;

    private boolean inHouseOven;
    private boolean dishwasher;
    private boolean inHouseLaundry;
    private boolean refrigerator;

    // Descriptions
    private String societyDescription;
    private String comments;

    // Photos
    private List<String> photoUrls;

    // Ratings
    private double ratings;

    // Audit fields
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date updatedAt;
}