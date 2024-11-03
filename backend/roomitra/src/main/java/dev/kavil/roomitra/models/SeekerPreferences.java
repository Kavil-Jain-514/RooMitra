package dev.kavil.roomitra.models;

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

@Document(collection = "seekerPreferences")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeekerPreferences {
    @Id
    private ObjectId id;
    private ObjectId seekerId;
    private String personalBio;
    private List<PreferenceAnswer> answersToPreferencesQuestions;
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date updatedAt;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PreferenceAnswer {
        private ObjectId questionId; // Refers to SeekerPreferenceQuestions
        private String answer;
    }
}
