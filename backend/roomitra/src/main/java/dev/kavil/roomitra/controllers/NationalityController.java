package dev.kavil.roomitra.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.kavil.roomitra.models.Nationalities;
import dev.kavil.roomitra.models.Occupations;
import dev.kavil.roomitra.repository.NationalitiesRepository;
import dev.kavil.roomitra.repository.OccupationsRepository;

@RestController
@RequestMapping("/api/v1")
public class NationalityController {
    @Autowired
    private NationalitiesRepository nationalitiesRepository;

    @Autowired
    private OccupationsRepository occupationsRepository;

    @GetMapping("/nationalities")
    public List<Nationalities> getAllNationalities() {
        return nationalitiesRepository.findAll();
    }

    @GetMapping("/nationalities/{id}")
    public Nationalities getNationality(@PathVariable String id) {
        return nationalitiesRepository.findById(id).orElse(null);
    }

    @GetMapping("/occupations")
    public List<Occupations> getAllOccupations() {
        return occupationsRepository.findAll();
    }

    @GetMapping("/occupations/{id}")
    public Occupations getOccupations(@PathVariable String id) {
        return occupationsRepository.findById(id).orElse(null);
    }
}
