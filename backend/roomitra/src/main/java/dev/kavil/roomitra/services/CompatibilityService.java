package dev.kavil.roomitra.services;

import org.springframework.stereotype.Service;

import dev.kavil.roomitra.models.ProviderPreferences;
import dev.kavil.roomitra.models.SeekerPreferences;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Data;

@Service
public class CompatibilityService {

    private static final Map<String, QuestionMapping> QUESTION_MAPPINGS = new HashMap<>();
    private static final Map<String, String> PROVIDER_QUESTION_IDS = new HashMap<>();
    private static final Map<String, String> SEEKER_QUESTION_IDS = new HashMap<>();

    static {
        initializeQuestionIds();
        initializeQuestionMappings();
    }

    @Data
    @AllArgsConstructor
    private static class QuestionMapping {
        private String providerQuestionId;
        private String seekerQuestionId;
        private double weight;
        private Map<String, Double> compatibilityScores;
        private String category;
    }

    private static void initializeQuestionIds() {
        // Provider Questions
        PROVIDER_QUESTION_IDS.put("What type of tenant are you looking for?", "673e817a79cefec657b716b2");
        PROVIDER_QUESTION_IDS.put("Do you have a preference for the tenant's gender?", "673e817a79cefec657b716b3");
        PROVIDER_QUESTION_IDS.put("Are you open to tenants with pets?", "673e817a79cefec657b716b5");
        PROVIDER_QUESTION_IDS.put("What level of cleanliness do you expect from tenants?", "673e817a79cefec657b716b6");
        PROVIDER_QUESTION_IDS.put("What are your preferred quiet hours?", "673e817a79cefec657b716b7");
        PROVIDER_QUESTION_IDS.put("Are utilities included in the rent?", "673e817a79cefec657b716b8");
        PROVIDER_QUESTION_IDS.put("How do you feel about shared chores?", "673e817a79cefec657b716b9");
        PROVIDER_QUESTION_IDS.put("What cooking habits do you prefer in a tenant?", "673e817a79cefec657b716ba");
        PROVIDER_QUESTION_IDS.put("Are you okay with tenants smoking in or near the property?",
                "673e817a79cefec657b716bb");
        PROVIDER_QUESTION_IDS.put("What type of tenant personality would suit your living space?",
                "673e817a79cefec657b716bc");
        PROVIDER_QUESTION_IDS.put("What's your policy on shared spaces (e.g., living room, kitchen)?",
                "673e817a79cefec657b716c2");

        // Seeker Questions
        SEEKER_QUESTION_IDS.put("What type of room are you looking for?", "673e80cb79cefec657b7169d");
        SEEKER_QUESTION_IDS.put("Do you prefer roommates of a specific gender?", "673e80cb79cefec657b7169f");
        SEEKER_QUESTION_IDS.put("Are you comfortable living with pets?", "673e80cb79cefec657b716a4");
        SEEKER_QUESTION_IDS.put("How important is cleanliness to you?", "673e80cb79cefec657b716a5");
        SEEKER_QUESTION_IDS.put("What are your preferred quiet hours?", "673e80cb79cefec657b716a6");
        SEEKER_QUESTION_IDS.put("How do you feel about sharing chores?", "673e80cb79cefec657b716a8");
        SEEKER_QUESTION_IDS.put("Do you prefer to cook at home or eat out?", "673e80cb79cefec657b716a9");
        SEEKER_QUESTION_IDS.put("Do you smoke or are you okay with smokers?", "673e80cb79cefec657b716a3");
        SEEKER_QUESTION_IDS.put("How do you study best?", "673e80cb79cefec657b716a0");
    }

    private static void initializeQuestionMappings() {
        // Lifestyle Category (Weight: 0.4)
        addQuestionMapping("smoking",
                "Are you okay with tenants smoking in or near the property?", // Provider question
                "Do you smoke or are you okay with smokers?", // Seeker question
                0.4,
                Map.of(
                        "No-Not okay with smokers", 1.0,
                        "Only outside-Okay with smokers", 0.8,
                        "Yes-I smoke", 1.0,
                        "No-I don't smoke", 1.0,
                        "Yes-Not okay with smokers", 0.0,
                        "Only outside-I smoke", 0.7),
                "lifestyle");

        addQuestionMapping("pets",
                "Are you open to tenants with pets?",
                "Are you comfortable living with pets?",
                0.4,
                Map.of(
                        "Yes-Yes", 1.0,
                        "No-No", 1.0,
                        "Yes-No", 0.0,
                        "No-Yes", 0.0),
                "lifestyle");

        // Living Habits Category (Weight: 0.3)
        addQuestionMapping("cleanliness",
                "What level of cleanliness do you expect from tenants?",
                "How important is cleanliness to you?",
                0.3,
                Map.of(
                        "Very important-Very important", 1.0,
                        "Somewhat important-Somewhat important", 1.0,
                        "Not important-Not important", 1.0,
                        "Very important-Somewhat important", 0.7,
                        "Somewhat important-Not important", 0.3,
                        "Very important-Not important", 0.0),
                "habits");

        addQuestionMapping("noise_level",
                "What's your ideal noise level at home?",
                "How do you study best?",
                0.3,
                Map.of(
                        "Quiet as a library-In total silence", 1.0,
                        "Some background noise is fine-With some background noise", 1.0,
                        "I don't mind a lot of noise-In a group", 1.0,
                        "Quiet as a library-With some background noise", 0.5,
                        "Some background noise is fine-In total silence", 0.5,
                        "I don't mind a lot of noise-In total silence", 0.0),
                "habits");

        // Social Preferences (Weight: 0.25)
        addQuestionMapping("visitors",
                "How often can tenants have visitors?",
                "How often do you have friends over?",
                0.25,
                Map.of(
                        "No visitors allowed-I'm not a big fan of having friends over", 1.0,
                        "Occasionally, with prior notice-I'm okay with it, but I prefer a quieter environment", 1.0,
                        "Frequent visitors are fine-I'm a social butterfly—I love having friends over often", 1.0,
                        "Occasionally, with prior notice-I'm a social butterfly—I love having friends over often", 0.5,
                        "No visitors allowed-I'm a social butterfly—I love having friends over often", 0.0),
                "social");

        // Shared Space Usage (Weight: 0.3)
        addQuestionMapping("shared_spaces",
                "What's your policy on shared spaces (e.g., living room, kitchen)?",
                "How do you feel about sharing chores?",
                0.3,
                Map.of(
                        "Open to sharing everything equally-I'm strict about equal sharing", 1.0,
                        "Restricted access to certain areas-I prefer a flexible approach", 0.7,
                        "Tenants have access only to their space-I don't mind doing more", 0.5),
                "living_arrangement");

        // Schedule Compatibility (Weight: 0.25)
        addQuestionMapping("quiet_hours",
                "What are your preferred quiet hours?",
                "What time do you usually go to bed?",
                0.25,
                Map.of(
                        "Night-Late (After Midnight)", 1.0,
                        "Evening-Moderate (10–12 PM)", 1.0,
                        "Morning-Early (before 10 PM)", 1.0,
                        "Night-Early (before 10 PM)", 0.3,
                        "Morning-Late (After Midnight)", 0.3),
                "schedule");

        // Cooking and Kitchen Usage (Weight: 0.2)
        addQuestionMapping("cooking_habits",
                "What cooking habits do you prefer in a tenant?",
                "Do you prefer to cook at home or eat out?",
                0.2,
                Map.of(
                        "I don't mind heavy cooking.-I'm a culinary artist—my kitchen is my canvas.", 1.0,
                        "I prefer someone who rarely cooks.-I'm a takeout connoisseur—leave the cooking to the pros!",
                        1.0,
                        "I'm fine with regular cooking as long as they clean up after.-I enjoy cooking, but only when I have time for it.",
                        0.8,
                        "I don't mind heavy cooking.-I'm a takeout connoisseur—leave the cooking to the pros!", 0.6),
                "lifestyle");

        // Cultural Compatibility (Weight: 0.2)
        addQuestionMapping("cultural_preferences",
                "Are you comfortable with tenants from different cultural backgrounds?",
                "Are you comfortable with roommates who have different dietary preferences than yours?",
                0.2,
                Map.of(
                        "Yes, I welcome diversity-Absolutely! Variety is the spice of life—I love learning about different diets.",
                        1.0,
                        "I'm open to discussion-I'm flexible as long as we respect each other's choices.", 0.8,
                        "I prefer someone with a similar background-Not really—my diet is important to me, so I prefer someone with similar preferences.",
                        0.6),
                "cultural");
    }

    private static void addQuestionMapping(String key, String providerQuestion, String seekerQuestion,
            double weight, Map<String, Double> compatibilityScores, String category) {
        // Find questionIds based on the question text
        String providerQuestionId = findQuestionId(providerQuestion, true);
        String seekerQuestionId = findQuestionId(seekerQuestion, false);

        QUESTION_MAPPINGS.put(key, new QuestionMapping(
                providerQuestionId,
                seekerQuestionId,
                weight,
                compatibilityScores,
                category));
    }

    private static String findQuestionId(String questionText, boolean isProvider) {
        if (isProvider) {
            return PROVIDER_QUESTION_IDS.getOrDefault(questionText, "");
        } else {
            return SEEKER_QUESTION_IDS.getOrDefault(questionText, "");
        }
    }

    public double calculateCompatibilityScore(SeekerPreferences seekerPrefs, ProviderPreferences providerPrefs) {
        if (seekerPrefs == null || providerPrefs == null) {
            return 0.0;
        }

        Map<String, String> seekerAnswers = seekerPrefs.getAnswers().stream()
                .collect(Collectors.toMap(SeekerPreferences.PreferenceAnswer::getQuestionId,
                        SeekerPreferences.PreferenceAnswer::getAnswer));
        Map<String, String> providerAnswers = providerPrefs.getAnswers().stream()
                .collect(Collectors.toMap(ProviderPreferences.PreferenceAnswer::getQuestionId,
                        ProviderPreferences.PreferenceAnswer::getAnswer));

        double totalScore = 0.0;
        double totalWeight = 0.0;

        for (QuestionMapping mapping : QUESTION_MAPPINGS.values()) {
            String providerAnswer = providerAnswers.get(mapping.getProviderQuestionId());
            String seekerAnswer = seekerAnswers.get(mapping.getSeekerQuestionId());

            if (providerAnswer != null && seekerAnswer != null) {
                String key = providerAnswer + "-" + seekerAnswer;
                Double score = mapping.getCompatibilityScores().getOrDefault(key, 0.0);
                totalScore += score * mapping.getWeight();
                totalWeight += mapping.getWeight();
            }
        }

        return totalWeight > 0 ? (totalScore / totalWeight) : 0.0;
    }
}
