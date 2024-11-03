package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import dev.kavil.roomitra.models.RoomProviders;
import dev.kavil.roomitra.models.RoomSeekers;
import dev.kavil.roomitra.repository.RoomSeekersRepository;
import dev.kavil.roomitra.repository.RoomProvidersRepository;

@Service
public class UserService {

    @Autowired
    private RoomSeekersRepository roomSeekersRepository;

    @Autowired
    private RoomProvidersRepository roomProvidersRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Register a RoomSeekers
    public RoomSeekers registerRoomSeeker(RoomSeekers seeker) {
        seeker.setPassword(passwordEncoder.encode(seeker.getPassword()));
        return roomSeekersRepository.save(seeker);
    }

    // Register a RoomProviders
    public RoomProviders registerRoomProvider(RoomProviders provider) {
        provider.setPassword(passwordEncoder.encode(provider.getPassword()));
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

}
