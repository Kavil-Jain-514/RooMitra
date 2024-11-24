package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.RoomDescription;

@Repository
public interface RoomDescriptionRepository extends MongoRepository<RoomDescription, String> {
    // Custom query methods can be defined here if needed
}
