package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.SeekerPreferences;

import java.util.Optional;

@Repository
public interface SeekerPreferencesRepository extends MongoRepository<SeekerPreferences, String> {
    Optional<SeekerPreferences> findFirstByUserIdOrderByUpdatedAtDesc(String userId);
}
