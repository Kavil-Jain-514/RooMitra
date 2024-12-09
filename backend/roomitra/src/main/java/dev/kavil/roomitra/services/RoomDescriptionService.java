package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import dev.kavil.roomitra.models.RoomDescription;
import dev.kavil.roomitra.repository.RoomDescriptionRepository;
import dev.kavil.roomitra.models.RoomProviders;
import dev.kavil.roomitra.repository.RoomProvidersRepository;

import java.util.List;
import java.util.Optional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.ArrayList;
import java.util.Date;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class RoomDescriptionService {

    @Autowired
    private RoomDescriptionRepository roomDescriptionRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private RoomProvidersRepository roomProvidersRepository;

    @Autowired
    private AmazonS3 amazonS3;

    private String bucketName;

    // Add this validation method
    private void validateRoomDescription(RoomDescription roomDescription) {
        Date today = new Date();
        if (roomDescription.getAvailabilityDate() != null &&
                roomDescription.getAvailabilityDate().before(today)) {
            throw new IllegalArgumentException("The availability date must be set to a future date");
        }

        // Add additional validations with descriptive messages
        if (roomDescription.getRent() <= 0) {
            throw new IllegalArgumentException("Rent must be greater than 0");
        }

        if (roomDescription.getSqft() <= 0) {
            throw new IllegalArgumentException("Square footage must be greater than 0");
        }

        if (roomDescription.getRooms() <= 0) {
            throw new IllegalArgumentException("Number of rooms must be greater than 0");
        }
    }

    // Create a new room description
    public RoomDescription createRoomDescription(RoomDescription roomDescription) {
        validateRoomDescription(roomDescription);
        RoomDescription savedDescription = roomDescriptionRepository.save(roomDescription);

        // Update the provider's roomDetailsId
        RoomProviders provider = roomProvidersRepository.findById(roomDescription.getProviderId())
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        provider.setRoomDetailsId(savedDescription.get_id());
        roomProvidersRepository.save(provider);

        return savedDescription;
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
        validateRoomDescription(updatedDescription);
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
                    description.setRent(updatedDescription.getRent());

                    // Only update photoUrls if new ones are provided
                    if (updatedDescription.getPhotoUrls() != null && !updatedDescription.getPhotoUrls().isEmpty()) {
                        description.setPhotoUrls(updatedDescription.getPhotoUrls());
                    }

                    RoomDescription savedDescription = roomDescriptionRepository.save(description);

                    // Update the provider's roomDetailsId
                    RoomProviders provider = roomProvidersRepository.findById(description.getProviderId())
                            .orElseThrow(() -> new RuntimeException("Provider not found"));
                    provider.setRoomDetailsId(savedDescription.get_id());
                    roomProvidersRepository.save(provider);

                    return savedDescription;
                })
                .orElseThrow(() -> new RuntimeException("Room description not found"));
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

        for (MultipartFile photo : photos) {
            String fileName = UUID.randomUUID().toString() + "_" + photo.getOriginalFilename();
            String s3Key = "rooms/" + roomId + "/" + fileName;

            try {
                // Upload to S3
                PutObjectRequest request = new PutObjectRequest(bucketName, s3Key, photo.getInputStream(), null);
                amazonS3.putObject(request);

                // Get the S3 URL
                String photoUrl = amazonS3.getUrl(bucketName, s3Key).toString();
                photoUrls.add(photoUrl);
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload photo", e);
            }
        }

        return photoUrls;
    }
}
