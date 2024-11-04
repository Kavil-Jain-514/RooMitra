package dev.kavil.roomitra.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.kavil.roomitra.models.Nationalities;

@Repository
public interface NationalitiesRepository extends MongoRepository<Nationalities, String> {
    // Custom query methods can be defined here if needed
}
