package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.ProviderPreferences;
import java.util.Optional;

@Repository
public interface ProviderPreferencesRepository extends MongoRepository<ProviderPreferences, String> {
    Optional<ProviderPreferences> findFirstByUserIdOrderByUpdatedAtDesc(String userId);
}
