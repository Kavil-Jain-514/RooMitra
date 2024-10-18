package dev.kavil.roomitra.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.model.RoomProviders;

@Repository
public interface RoomProvidersRepository extends MongoRepository<RoomProviders, ObjectId> {
    // Custom query methods can be defined here if needed
}

