package dev.kavil.roomitra.models;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "ProviderPreferenceQuestions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderPreferenceQuestions {
    @Id
    private String _id;

    private String question; // The text of the question

    // Optional: predefined list of possible answers for the user to choose from
    private List<String> possibleAnswers;
}
