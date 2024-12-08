package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import dev.kavil.roomitra.models.Messages;
import java.util.List;

public interface MessagesRepository extends MongoRepository<Messages, String> {
    List<Messages> findBySenderIdAndRecipientIdOrRecipientIdAndSenderIdOrderBySentAtDesc(
            String senderId1, String recipientId1, String senderId2, String recipientId2);
}
