package dev.kavil.roomitra.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "occupations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Occupations {
    @Id
    private String _id; // Occupation ID
    @Field("occupation_name")
    private String occupationName; // Name of the occupation
}
