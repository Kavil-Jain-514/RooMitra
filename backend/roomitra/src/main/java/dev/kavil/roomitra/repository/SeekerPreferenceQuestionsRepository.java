package dev.kavil.roomitra.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.SeekerPreferenceQuestions;

@Repository
public interface SeekerPreferenceQuestionsRepository extends MongoRepository<SeekerPreferenceQuestions, ObjectId> {
    // Custom query methods can be defined here if needed
}
