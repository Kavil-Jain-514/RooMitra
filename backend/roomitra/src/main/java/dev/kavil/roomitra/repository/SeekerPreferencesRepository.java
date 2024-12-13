package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.SeekerPreferences;

@Repository
public interface SeekerPreferencesRepository extends MongoRepository<SeekerPreferences, String> {
    void deleteByUserId(String userId);

    SeekerPreferences findByUserId(String userId);
}
