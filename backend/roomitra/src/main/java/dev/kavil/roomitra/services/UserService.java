package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import dev.kavil.roomitra.models.RoomProviders;
import dev.kavil.roomitra.models.RoomSeekers;
import dev.kavil.roomitra.repository.RoomSeekersRepository;
import dev.kavil.roomitra.repository.RoomProvidersRepository;

import java.util.HashSet;
import java.util.Set;

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

}
