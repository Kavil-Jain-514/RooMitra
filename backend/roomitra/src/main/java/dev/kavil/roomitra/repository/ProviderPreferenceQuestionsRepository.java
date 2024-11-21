package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.ProviderPreferenceQuestions;

@Repository
public interface ProviderPreferenceQuestionsRepository extends MongoRepository<ProviderPreferenceQuestions, String> {
    // Custom query methods can be defined here if needed
}
