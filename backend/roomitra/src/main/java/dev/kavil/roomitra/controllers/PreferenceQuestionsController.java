package dev.kavil.roomitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.kavil.roomitra.models.ProviderPreferenceQuestions;
import dev.kavil.roomitra.models.SeekerPreferenceQuestions;
import dev.kavil.roomitra.repository.ProviderPreferenceQuestionsRepository;
import dev.kavil.roomitra.repository.SeekerPreferenceQuestionsRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class PreferenceQuestionsController {
    @Autowired
    private ProviderPreferenceQuestionsRepository providerPreferenceQuestionsRepository;

    @Autowired
    private SeekerPreferenceQuestionsRepository seekerPreferenceQuestionsRepository;

    @GetMapping("/provider-preference-questions")
    public ResponseEntity<List<ProviderPreferenceQuestions>> getProviderPreferenceQuestions() {
        List<ProviderPreferenceQuestions> questions = providerPreferenceQuestionsRepository.findAll();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/seeker-preference-questions")
    public ResponseEntity<List<SeekerPreferenceQuestions>> getSeekerPreferenceQuestions() {
        List<SeekerPreferenceQuestions> questions = seekerPreferenceQuestionsRepository.findAll();
        return ResponseEntity.ok(questions);
    }
}