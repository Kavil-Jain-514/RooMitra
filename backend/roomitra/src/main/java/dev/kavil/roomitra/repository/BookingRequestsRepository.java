package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.BookingRequests;

@Repository
public interface BookingRequestsRepository extends MongoRepository<BookingRequests, String> {
    // Custom query methods can be defined here if needed
}
