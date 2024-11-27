package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import dev.kavil.roomitra.models.RoomDescription;
import dev.kavil.roomitra.repository.RoomDescriptionRepository;

import java.util.List;
import java.util.Optional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.ArrayList;

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
        return roomDescriptionRepository.findById(id)
                .map(description -> {
                    // Copy all fields from updatedDescription to description
                    description.setProviderId(updatedDescription.getProviderId());
                    description.setSqft(updatedDescription.getSqft());
                    description.setRooms(updatedDescription.getRooms());
                    description.setBath(updatedDescription.getBath());
                    description.setBed(updatedDescription.getBed());
                    description.setFloor(updatedDescription.getFloor());
                    description.setStreetName(updatedDescription.getStreetName());
                    description.setApartmentNumber(updatedDescription.getApartmentNumber());
                    description.setCity(updatedDescription.getCity());
                    description.setZipcode(updatedDescription.getZipcode());
                    description.setRoomType(updatedDescription.getRoomType());
                    description.setAvailabilityDate(updatedDescription.getAvailabilityDate());
                    description.setPatio(updatedDescription.isPatio());
                    description.setWasherDryer(updatedDescription.isWasherDryer());
                    description.setPetFriendly(updatedDescription.isPetFriendly());
                    description.setAcType(updatedDescription.getAcType());
                    description.setStoveType(updatedDescription.getStoveType());
                    description.setInHouseOven(updatedDescription.isInHouseOven());
                    description.setDishwasher(updatedDescription.isDishwasher());
                    description.setInHouseLaundry(updatedDescription.isInHouseLaundry());
                    description.setRefrigerator(updatedDescription.isRefrigerator());
                    description.setSocietyDescription(updatedDescription.getSocietyDescription());
                    description.setComments(updatedDescription.getComments());

                    // Only update photoUrls if new ones are provided
                    if (updatedDescription.getPhotoUrls() != null && !updatedDescription.getPhotoUrls().isEmpty()) {
                        description.setPhotoUrls(updatedDescription.getPhotoUrls());
                    }

                    return roomDescriptionRepository.save(description);
                })
                .orElse(null);
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

    // Add this method to handle photo uploads
    public List<String> uploadPhotos(List<MultipartFile> photos, String roomId) {
        List<String> photoUrls = new ArrayList<>();
        String uploadDir = "uploads/rooms/" + roomId + "/";

        try {
            Files.createDirectories(Paths.get(uploadDir));

            for (MultipartFile photo : photos) {
                String fileName = UUID.randomUUID().toString() + "_" + photo.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                Files.copy(photo.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                photoUrls.add("/uploads/rooms/" + roomId + "/" + fileName);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not store photos", e);
        }

        return photoUrls;
    }
}
