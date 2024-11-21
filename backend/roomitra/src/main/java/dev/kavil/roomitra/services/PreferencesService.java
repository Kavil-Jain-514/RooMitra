package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.kavil.roomitra.models.SeekerPreferences;
import dev.kavil.roomitra.models.ProviderPreferences;
import dev.kavil.roomitra.repository.SeekerPreferencesRepository;
import dev.kavil.roomitra.repository.ProviderPreferencesRepository;

@Service
public class PreferencesService {
    @Autowired
    private SeekerPreferencesRepository seekerPreferencesRepository;

    @Autowired
    private ProviderPreferencesRepository providerPreferencesRepository;

    public void saveSeekerPreferences(SeekerPreferences request) {
        // Delete existing preferences for this user
        seekerPreferencesRepository.deleteByUserId(request.getUserId());
        // Save new preferences
        seekerPreferencesRepository.save(request);
    }

    public void saveProviderPreferences(ProviderPreferences request) {
        // Delete existing preferences for this user
        providerPreferencesRepository.deleteByUserId(request.getUserId());
        // Save new preferences
        providerPreferencesRepository.save(request);
    }
}