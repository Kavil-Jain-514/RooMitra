package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;

import dev.kavil.roomitra.models.RoomProviders;
import dev.kavil.roomitra.models.RoomSeekers;
import dev.kavil.roomitra.repository.RoomSeekersRepository;
import dev.kavil.roomitra.repository.RoomProvidersRepository;

import java.util.HashSet;
import java.util.Set;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private RoomSeekersRepository roomSeekersRepository;

    @Autowired
    private RoomProvidersRepository roomProvidersRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private Set<String> invalidatedTokens = new HashSet<>();

    // Email validation helper
    private boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }

    // Check if email already exists
    private boolean isEmailTaken(String email) {
        return roomSeekersRepository.findByEmail(email) != null ||
                roomProvidersRepository.findByEmail(email) != null;
    }

    // Register a RoomSeekers
    public RoomSeekers registerRoomSeeker(RoomSeekers seeker) {
        seeker.setPassword(passwordEncoder.encode(seeker.getPassword()));
        seeker.setUserType(RoomSeekers.UserType.RoomSeeker);
        return roomSeekersRepository.save(seeker);
    }

    // Register a RoomProviders
    public RoomProviders registerRoomProvider(RoomProviders provider) {
        provider.setPassword(passwordEncoder.encode(provider.getPassword()));
        provider.setUserType(RoomProviders.UserType.RoomProvider);
        return roomProvidersRepository.save(provider);
    }

    // Authenticate RoomSeekers
    public RoomSeekers authenticateRoomSeeker(String email, String password) {
        RoomSeekers seeker = roomSeekersRepository.findByEmail(email);
        if (seeker != null && passwordEncoder.matches(password, seeker.getPassword())) {
            return seeker;
        }
        return null;
    }

    // Authenticate RoomProviders
    public RoomProviders authenticateRoomProvider(String email, String password) {
        RoomProviders provider = roomProvidersRepository.findByEmail(email);
        if (provider != null && passwordEncoder.matches(password, provider.getPassword())) {
            return provider;
        }
        return null;
    }

    public void invalidateToken(String token) {
        invalidatedTokens.add(token);
    }

    public boolean isTokenInvalid(String token) {
        return invalidatedTokens.contains(token);
    }

    public Object authenticateUser(String email, String password) {
        // Try authenticating as RoomSeeker
        RoomSeekers seeker = authenticateRoomSeeker(email, password);
        if (seeker != null) {
            return seeker;
        }

        // Try authenticating as RoomProvider
        RoomProviders provider = authenticateRoomProvider(email, password);
        if (provider != null) {
            return provider;
        }

        return null;
    }

    public RoomSeekers getRoomSeekerDetails(String userId) {
        return roomSeekersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public RoomProviders getRoomProviderDetails(String userId) {
        return roomProvidersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public RoomSeekers updateRoomSeekerBio(String userId, String bio) {
        RoomSeekers seeker = getRoomSeekerDetails(userId);
        seeker.setBio(bio);
        return roomSeekersRepository.save(seeker);
    }

    public RoomProviders updateRoomProviderBio(String userId, String bio) {
        RoomProviders provider = getRoomProviderDetails(userId);
        provider.setBio(bio);
        return roomProvidersRepository.save(provider);
    }

    public Map<String, String> getRoomSeekerName(String userId) {
        RoomSeekers seeker = getRoomSeekerDetails(userId);
        Map<String, String> nameMap = new HashMap<>();
        nameMap.put("firstName", seeker.getFirstName());
        nameMap.put("lastName", seeker.getLastName());
        return nameMap;
    }

    public Map<String, String> getRoomProviderName(String userId) {
        RoomProviders provider = getRoomProviderDetails(userId);
        Map<String, String> nameMap = new HashMap<>();
        nameMap.put("firstName", provider.getFirstName());
        nameMap.put("lastName", provider.getLastName());
        return nameMap;
    }

    public List<RoomSeekers> getAllRoomSeekers() {
        return roomSeekersRepository.findAll();
    }

    public List<RoomProviders> getAllRoomProviders() {
        return roomProvidersRepository.findAll();
    }

    public void updateProfilePhoto(String email, String photoUrl) {
        RoomSeekers seeker = roomSeekersRepository.findByEmail(email);
        if (seeker != null) {
            seeker.setProfilePhoto(photoUrl);
            roomSeekersRepository.save(seeker);
            return;
        }

        RoomProviders provider = roomProvidersRepository.findByEmail(email);
        if (provider != null) {
            provider.setProfilePhoto(photoUrl);
            roomProvidersRepository.save(provider);
        }
    }

}
