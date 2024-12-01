package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import dev.kavil.roomitra.models.Notifications;
import java.util.List;

public interface NotificationsRepository extends MongoRepository<Notifications, String> {
    List<Notifications> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Notifications> findByUserIdAndIsReadFalse(String userId);

    List<Notifications> findByUserIdAndIsReadFalseOrderByCreatedAtDesc(String userId);
}
