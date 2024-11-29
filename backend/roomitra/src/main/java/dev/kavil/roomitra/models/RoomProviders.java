package dev.kavil.roomitra.models;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "roomProviders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomProviders {
    @Id
    private String _id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Date dateOfBirth;

    public enum Gender {
        Male, Female, Transgender, Non_binary, None
    }

    private Gender gender;
    private String nationalityId;
    private String occupationId;
    private String phoneNumber;

    public enum UserType {
        RoomSeeker, RoomProvider
    }

    private UserType userType;
    private String roomLocationId;
    private float rent;
    private String roomDetailsId;
    private String preferencesId;
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date updatedAt;
    private String profilePhoto;
    private double rating;
    private boolean isVerified;
    private String bio;
}
