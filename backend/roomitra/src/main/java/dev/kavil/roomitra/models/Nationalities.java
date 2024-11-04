package dev.kavil.roomitra.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "nationalities")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Nationalities {
    @Id
    private String _id;
    @Field("nationality_name")
    private String nationalityName; // Name of the nationality
}
