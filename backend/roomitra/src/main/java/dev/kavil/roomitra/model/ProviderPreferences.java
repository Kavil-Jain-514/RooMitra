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

@Document(collection = "providerPreferences")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderPreferences {
    @Id
    private ObjectId id;
    private ObjectId providerId;
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
        private ObjectId questionId; // Refers to ProviderPreferenceQuestions
        private String answer;
    }
}
