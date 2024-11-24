package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.Locations;

@Repository
public interface LocationsRepository extends MongoRepository<Locations, String> {
    // Custom query methods can be defined here if needed
}
