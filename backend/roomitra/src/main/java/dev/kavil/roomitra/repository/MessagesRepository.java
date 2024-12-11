package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import dev.kavil.roomitra.models.Messages;
import java.util.List;
import org.springframework.data.mongodb.repository.Query;

public interface MessagesRepository extends MongoRepository<Messages, String> {
    // Find messages in both directions between two users
    @Query("{ $or: [ " +
            "{ 'senderId': ?0, 'recipientId': ?1 }, " +
            "{ 'senderId': ?1, 'recipientId': ?0 } " +
            "] }")
    List<Messages> findConversationBetweenUsers(String userId1, String userId2);
}
