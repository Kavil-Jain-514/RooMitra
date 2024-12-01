package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import dev.kavil.roomitra.models.Matches;
import java.util.List;

public interface MatchesRepository extends MongoRepository<Matches, String> {
    List<Matches> findBySeekerIdOrderByLastInteractionAtDesc(String seekerId);

    List<Matches> findByProviderIdOrderByLastInteractionAtDesc(String providerId);

    boolean existsByProviderIdAndSeekerId(String providerId, String seekerId);

    List<Matches> findBySeekerIdAndStatus(String seekerId, Matches.MatchStatus status);

    List<Matches> findByProviderIdAndStatus(String providerId, Matches.MatchStatus status);
}
