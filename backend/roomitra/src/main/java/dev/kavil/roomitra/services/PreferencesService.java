package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.kavil.roomitra.models.SeekerPreferences;
import dev.kavil.roomitra.models.ProviderPreferences;
import dev.kavil.roomitra.repository.SeekerPreferencesRepository;
import dev.kavil.roomitra.repository.ProviderPreferencesRepository;
import dev.kavil.roomitra.repository.RoomProvidersRepository;
import dev.kavil.roomitra.repository.RoomSeekersRepository;
import dev.kavil.roomitra.models.RoomProviders;
import dev.kavil.roomitra.models.RoomSeekers;
import java.util.Date;

@Service
public class PreferencesService {
    @Autowired
    private SeekerPreferencesRepository seekerPreferencesRepository;

    @Autowired
    private ProviderPreferencesRepository providerPreferencesRepository;

    @Autowired
    private RoomProvidersRepository roomProvidersRepository;

    @Autowired
    private RoomSeekersRepository roomSeekersRepository;

    public SeekerPreferences getSeekerPreferences(String userId) {
        // Get the most recent preferences for the seeker
        return seekerPreferencesRepository.findFirstByUserIdOrderByUpdatedAtDesc(userId)
                .orElseThrow(() -> new RuntimeException("Seeker preferences not found for user: " + userId));
    }

    public ProviderPreferences getProviderPreferences(String userId) {
        // Get the most recent preferences for the provider
        return providerPreferencesRepository.findFirstByUserIdOrderByUpdatedAtDesc(userId)
                .orElseThrow(() -> new RuntimeException("Provider preferences not found for user: " + userId));
    }

    public ProviderPreferences saveProviderPreferences(ProviderPreferences preferences) {
        // Delete previous preferences if they exist
        RoomProviders provider = roomProvidersRepository.findById(preferences.getUserId())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        if (provider.getPreferencesId() != null) {
            providerPreferencesRepository.deleteById(provider.getPreferencesId());
        }

        // Set timestamps and save new preferences
        if (preferences.getId() == null) {
            preferences.setCreatedAt(new Date());
        }
        preferences.setUpdatedAt(new Date());
        ProviderPreferences savedPreferences = providerPreferencesRepository.save(preferences);

        // Update the provider's preferenceId
        provider.setPreferencesId(savedPreferences.getId());
        roomProvidersRepository.save(provider);

        return savedPreferences;
    }

    public SeekerPreferences saveSeekerPreferences(SeekerPreferences preferences) {
        // Delete previous preferences if they exist
        RoomSeekers seeker = roomSeekersRepository.findById(preferences.getUserId())
                .orElseThrow(() -> new RuntimeException("Seeker not found"));

        if (seeker.getPreferencesId() != null) {
            seekerPreferencesRepository.deleteById(seeker.getPreferencesId());
        }

        // Set timestamps and save new preferences
        if (preferences.getId() == null) {
            preferences.setCreatedAt(new Date());
        }
        preferences.setUpdatedAt(new Date());
        SeekerPreferences savedPreferences = seekerPreferencesRepository.save(preferences);

        // Update the seeker's preferenceId
        seeker.setPreferencesId(savedPreferences.getId());
        roomSeekersRepository.save(seeker);

        return savedPreferences;
    }

    public boolean checkSeekerPreferencesExist(String userId) {
        return seekerPreferencesRepository.findFirstByUserIdOrderByUpdatedAtDesc(userId).isPresent();
    }

    public boolean checkProviderPreferencesExist(String userId) {
        return providerPreferencesRepository.findFirstByUserIdOrderByUpdatedAtDesc(userId).isPresent();
    }
}