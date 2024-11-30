package dev.kavil.roomitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.kavil.roomitra.models.Matches;
import dev.kavil.roomitra.repository.MatchesRepository;
import java.util.Date;
import java.util.List;

@Service
public class MatchService {
    @Autowired
    private MatchesRepository matchesRepository;

    public Matches createMatch(Matches match) {
        match.setCreatedAt(new Date());
        match.setUpdatedAt(new Date());
        match.setLastInteractionAt(new Date());
        match.setStatus(Matches.MatchStatus.PENDING);
        return matchesRepository.save(match);
    }

    public Matches updateMatchStatus(String matchId, String status) {
        Matches match = matchesRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

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
}