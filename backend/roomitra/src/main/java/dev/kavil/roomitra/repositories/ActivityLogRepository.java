package dev.kavil.roomitra.repositories;

import dev.kavil.roomitra.model.ActivityLog;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityLogRepository extends MongoRepository<ActivityLog, ObjectId> {
    // Custom query methods can be defined here if needed
}