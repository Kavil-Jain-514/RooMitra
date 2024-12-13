package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.ProviderPreferences;

@Repository
public interface ProviderPreferencesRepository extends MongoRepository<ProviderPreferences, String> {
    void deleteByUserId(String userId);

    ProviderPreferences findByUserId(String userId);
}
