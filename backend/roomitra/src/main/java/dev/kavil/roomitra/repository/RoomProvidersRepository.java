package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.RoomProviders;

@Repository
public interface RoomProvidersRepository extends MongoRepository<RoomProviders, String> {
    // Custom query methods can be defined here if needed
    RoomProviders findByEmail(String email);
}
