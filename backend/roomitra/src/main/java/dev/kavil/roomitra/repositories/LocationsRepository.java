package dev.kavil.roomitra.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.model.Locations;

@Repository
public interface LocationsRepository extends MongoRepository<Locations, ObjectId> {
    // Custom query methods can be defined here if needed
}
