package dev.kavil.roomitra.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "locations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Locations {
    @Id
    private String _id;
    private String city;
}