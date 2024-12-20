package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.kavil.roomitra.models.Matches;
import dev.kavil.roomitra.models.ProviderPreferences;
import dev.kavil.roomitra.models.SeekerPreferences;
import dev.kavil.roomitra.repository.MatchesRepository;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.Arrays;
import java.util.HashMap;

@Service
public class MatchService {
    @Autowired
    private MatchesRepository matchesRepository;

    @Autowired
    private CompatibilityService compatibilityService;

    @Autowired
    private PreferencesService preferencesService;

    public Matches createMatch(Matches match) {
        if (existsByProviderAndSeeker(match.getProviderId(), match.getSeekerId())) {
            throw new RuntimeException("A connection already exists between these users");
        }

        if (match.getRequestedBy() == null) {
            throw new RuntimeException("requestedBy field cannot be null");
        }

        match.setCreatedAt(new Date());
        match.setUpdatedAt(new Date());
        match.setLastInteractionAt(new Date());
        match.setStatus(Matches.MatchStatus.PENDING);

        if (!match.getRequestedBy().equals(match.getSeekerId()) &&
                !match.getRequestedBy().equals(match.getProviderId())) {
            throw new RuntimeException("Invalid requestedBy value");
        }

        return matchesRepository.save(match);
    }

    public Matches updateMatchStatus(String matchId, String status) {
        Matches match = matchesRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        if (match.getStatus() != Matches.MatchStatus.PENDING) {
            throw new RuntimeException("This connection request has already been processed");
        }

        match.setStatus(Matches.MatchStatus.valueOf(status.toUpperCase()));
        match.setUpdatedAt(new Date());
        match.setLastInteractionAt(new Date());

        return matchesRepository.save(match);
    }

    public List<Matches> getMatchesBySeekerId(String seekerId) {
        return matchesRepository.findBySeekerIdOrderByLastInteractionAtDesc(seekerId);
    }

    public List<Matches> getMatchesByProviderId(String providerId) {
        return matchesRepository.findByProviderIdOrderByLastInteractionAtDesc(providerId);
    }

    public boolean existsByProviderAndSeeker(String providerId, String seekerId) {
        // Check if there's any existing match (PENDING or ACCEPT) between these users
        List<Matches> existingMatches = matchesRepository.findByProviderIdAndSeekerId(providerId, seekerId);
        if (!existingMatches.isEmpty()) {
            return true;
        }

        // Also check the reverse combination
        existingMatches = matchesRepository.findByProviderIdAndSeekerId(seekerId, providerId);
        return !existingMatches.isEmpty();
    }

    public List<Matches> getPendingMatchesByUserId(String userId) {
        List<Matches> seekerMatches = matchesRepository.findBySeekerIdAndStatus(userId, Matches.MatchStatus.PENDING);
        List<Matches> providerMatches = matchesRepository.findByProviderIdAndStatus(userId,
                Matches.MatchStatus.PENDING);

        // Filter based on requestedBy field
        List<Matches> filteredMatches = new ArrayList<>();

        // For seekers: show only incoming requests from providers
        filteredMatches.addAll(seekerMatches.stream()
                .filter(match -> {
                    String requestedBy = match.getRequestedBy();
                    // If requestedBy is null, assume it's an incoming request
                    return requestedBy == null || !requestedBy.equals(userId);
                })
                .collect(Collectors.toList()));

        // For providers: show only incoming requests from seekers
        filteredMatches.addAll(providerMatches.stream()
                .filter(match -> {
                    String requestedBy = match.getRequestedBy();
                    // If requestedBy is null, assume it's an incoming request
                    return requestedBy == null || !requestedBy.equals(userId);
                })
                .collect(Collectors.toList()));

        return filteredMatches;
    }

    public boolean areUsersConnected(String userId1, String userId2) {
        // Check both combinations since we don't know which user is provider/seeker
        List<Matches> matches = matchesRepository.findByProviderIdAndSeekerIdAndStatus(
                userId1, userId2, Matches.MatchStatus.ACCEPT);

        if (matches.isEmpty()) {
            matches = matchesRepository.findByProviderIdAndSeekerIdAndStatus(
                    userId2, userId1, Matches.MatchStatus.ACCEPT);
        }

        return !matches.isEmpty();
    }

    public Map<String, Object> getDetailedConnectionStatus(String userId1, String userId2) {
        List<Matches.MatchStatus> statuses = Arrays.asList(Matches.MatchStatus.PENDING, Matches.MatchStatus.ACCEPT);

        // Check both combinations
        List<Matches> matches = matchesRepository.findByProviderIdAndSeekerIdAndStatusIn(userId1, userId2, statuses);
        if (matches.isEmpty()) {
            matches = matchesRepository.findByProviderIdAndSeekerIdAndStatusIn(userId2, userId1, statuses);
        }

        if (matches.isEmpty()) {
            return Map.of("status", "NONE", "connected", false);
        }

        Matches match = matches.get(0);
        boolean isPending = match.getStatus() == Matches.MatchStatus.PENDING;
        boolean isRequestedByCurrentUser = match.getRequestedBy().equals(userId1);

        return Map.of(
                "status", match.getStatus().toString(),
                "connected", match.getStatus() == Matches.MatchStatus.ACCEPT,
                "isPending", isPending,
                "isRequestedByCurrentUser", isRequestedByCurrentUser);
    }

    public Map<String, Object> getDetailedMatchInfo(Matches match) {
        Map<String, Object> matchInfo = new HashMap<>();
        matchInfo.put("match", match);

        if (match.getStatus() == Matches.MatchStatus.ACCEPT) {
            SeekerPreferences seekerPrefs = preferencesService.getSeekerPreferences(match.getSeekerId());
            ProviderPreferences providerPrefs = preferencesService.getProviderPreferences(match.getProviderId());
            double compatibilityScore = compatibilityService.calculateCompatibilityScore(seekerPrefs, providerPrefs);
            matchInfo.put("compatibilityScore", compatibilityScore);
        }

        return matchInfo;
    }
}