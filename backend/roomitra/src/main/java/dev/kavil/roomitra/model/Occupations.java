package dev.kavil.roomitra.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "occupations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Occupations {
    @Id
    private ObjectId id;            // Occupation ID

    private String occupationName;  // Name of the occupation
}
