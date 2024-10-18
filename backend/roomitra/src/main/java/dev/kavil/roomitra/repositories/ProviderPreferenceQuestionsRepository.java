package dev.kavil.roomitra.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.model.ProviderPreferenceQuestions;

@Repository
public interface ProviderPreferenceQuestionsRepository extends MongoRepository<ProviderPreferenceQuestions, ObjectId> {
    // Custom query methods can be defined here if needed
}

