package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.kavil.roomitra.models.Matches;
import dev.kavil.roomitra.repository.MatchesRepository;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class MatchService {
    @Autowired
    private MatchesRepository matchesRepository;

    public Matches createMatch(Matches match) {
        if (existsByProviderAndSeeker(match.getProviderId(), match.getSeekerId())) {
            throw new RuntimeException("A connection already exists between these users");
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
        return matchesRepository.existsByProviderIdAndSeekerId(providerId, seekerId);
    }

    public List<Matches> getPendingMatchesByUserId(String userId) {
        List<Matches> seekerMatches = matchesRepository.findBySeekerIdAndStatus(userId, Matches.MatchStatus.PENDING);
        List<Matches> providerMatches = matchesRepository.findByProviderIdAndStatus(userId,
                Matches.MatchStatus.PENDING);

        // Filter based on requestedBy field
        List<Matches> filteredMatches = new ArrayList<>();

        // For seekers: show only incoming requests
        filteredMatches.addAll(seekerMatches.stream()
                .filter(match -> match.getRequestedBy().equals(match.getProviderId()))
                .collect(Collectors.toList()));

        // For providers: show only outgoing requests
        filteredMatches.addAll(providerMatches.stream()
                .filter(match -> match.getRequestedBy().equals(match.getProviderId()))
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
}