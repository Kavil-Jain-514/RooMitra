package dev.kavil.roomitra.model;

import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "seekerPreferenceQuestions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeekerPreferenceQuestions {
    @Id
    private ObjectId id;

    private String question; // The text of the question

    // Optional: predefined list of possible answers for the user to choose from
    private List<String> possibleAnswers;
}
