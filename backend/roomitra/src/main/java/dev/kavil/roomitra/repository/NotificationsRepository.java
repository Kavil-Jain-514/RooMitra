package dev.kavil.roomitra.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.Notifications;

@Repository
public interface NotificationsRepository extends MongoRepository<Notifications, ObjectId> {
    // Custom query methods can be defined here if needed
}
