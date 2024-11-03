package dev.kavil.roomitra.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.Feedback;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback, ObjectId> {
    // Custom query methods can be defined here if needed
}
