package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import dev.kavil.roomitra.models.RoomDescription;
import dev.kavil.roomitra.repository.RoomDescriptionRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RoomDescriptionService {

    @Autowired
    private RoomDescriptionRepository roomDescriptionRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    // Create a new room description
    public RoomDescription createRoomDescription(RoomDescription roomDescription) {
        return roomDescriptionRepository.save(roomDescription);
    }

    // Get room description by ID
    public Optional<RoomDescription> getRoomDescriptionById(String id) {
        return roomDescriptionRepository.findById(id);
    }

    // Get room descriptions by provider ID
    public List<RoomDescription> getRoomDescriptionsByProviderId(String providerId) {
        Query query = new Query(Criteria.where("providerId").is(providerId));
        return mongoTemplate.find(query, RoomDescription.class);
    }

    // Update room description
    public RoomDescription updateRoomDescription(String id, RoomDescription updatedDescription) {
        Optional<RoomDescription> existingDescription = roomDescriptionRepository.findById(id);

        if (existingDescription.isPresent()) {
            RoomDescription description = existingDescription.get();

            // Update fields
            description.setSqft(updatedDescription.getSqft());
            description.setRooms(updatedDescription.getRooms());
            description.setPatio(updatedDescription.isPatio());
            description.setWasherDryer(updatedDescription.isWasherDryer());
            description.setStovetop(updatedDescription.getStovetop());
            description.setBath(updatedDescription.getBath());
            description.setBed(updatedDescription.getBed());
            description.setLocationId(updatedDescription.getLocationId());
            description.setSocietyDescription(updatedDescription.getSocietyDescription());
            description.setComments(updatedDescription.getComments());
            description.setAvailabilityDate(updatedDescription.getAvailabilityDate());
            description.setSharedRoom(updatedDescription.isSharedRoom());
            description.setPetFriendly(updatedDescription.isPetFriendly());

            return roomDescriptionRepository.save(description);
        }

        return null;
    }

    // Delete room description
    public void deleteRoomDescription(String id) {
        roomDescriptionRepository.deleteById(id);
    }

    // Update room ratings
    public void updateRoomRatings(String roomId, double newRating) {
        Optional<RoomDescription> room = roomDescriptionRepository.findById(roomId);
        if (room.isPresent()) {
            RoomDescription description = room.get();
            description.setRatings(newRating);
            roomDescriptionRepository.save(description);
        }
    }

    // Get available rooms (not booked)
    public List<RoomDescription> getAvailableRooms() {
        Query query = new Query(Criteria.where("availabilityDate").lte(new java.util.Date()));
        return mongoTemplate.find(query, RoomDescription.class);
    }
}
