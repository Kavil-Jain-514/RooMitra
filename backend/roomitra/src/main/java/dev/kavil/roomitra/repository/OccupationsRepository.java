package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.Occupations;

@Repository
public interface OccupationsRepository extends MongoRepository<Occupations, String> {
    // Custom query methods can be defined here if needed
}
