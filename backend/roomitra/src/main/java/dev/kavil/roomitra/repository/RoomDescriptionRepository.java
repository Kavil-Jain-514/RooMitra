package dev.kavil.roomitra.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.RoomDescription;

@Repository
public interface RoomDescriptionRepository extends MongoRepository<RoomDescription, ObjectId> {
    // Custom query methods can be defined here if needed
}
