package dev.kavil.roomitra.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "nationalities")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Nationalities {
    @Id
    private ObjectId id; // Nationality ID

    private String nationalityName; // Name of the nationality
}
