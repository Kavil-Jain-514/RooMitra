package dev.kavil.roomitra.model;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "roomSeekers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomSeekers {
    @Id
    private ObjectId id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Date dateOfBirth;
    public enum Gender {
        Male, Female, Transgender, Non_binary, None
    }
    private Gender gender; 
    private ObjectId nationalityId;
    private ObjectId occupationId;
    private String phoneNumber;
    public enum UserType {
        RoomSeeker, RoomProvider
    }
    private UserType userType;
    private List<ObjectId> preferredLocationIds;
    private float minimumRent;
    private ObjectId preferencesId;
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date updatedAt;
    private String profilePhoto;
    private double rating;
}
