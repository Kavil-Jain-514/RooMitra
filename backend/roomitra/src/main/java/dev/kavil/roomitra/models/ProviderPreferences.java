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

@Document(collection = "providerPreferences")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderPreferences {
    @Id
    private String id;
    private String userId;
    private List<PreferenceAnswer> answers;
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date updatedAt;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PreferenceAnswer {
        private String questionId;
        private String answer;
    }
}
