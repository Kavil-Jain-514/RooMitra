// package dev.kavil.roomitra.services;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import dev.kavil.roomitra.models.SeekerPreferences;
// import dev.kavil.roomitra.models.ProviderPreferences;
// import java.util.Map;
// import java.util.HashMap;
// import java.util.List;

// @Service
// public class CompatibilityService {

//     private static final Map<String, Double> QUESTION_WEIGHTS = new HashMap<>();

//     static {
//         // Define weights for different question types
//         QUESTION_WEIGHTS.put("lifestyle", 0.3); // Smoking, pets, etc.
//         QUESTION_WEIGHTS.put("schedule", 0.2); // Work schedule, sleep schedule
//         QUESTION_WEIGHTS.put("cleanliness", 0.25); // Cleaning habits
//         QUESTION_WEIGHTS.put("social", 0.15); // Social preferences
//         QUESTION_WEIGHTS.put("other", 0.1); // Other preferences
//     }

//     public double calculateCompatibilityScore(SeekerPreferences seekerPrefs, ProviderPreferences providerPrefs) {
//         if (seekerPrefs == null || providerPrefs == null) {
//             return 0.0;
//         }

//         double totalScore = 0.0;
//         double totalWeight = 0.0;

//         // Create maps for easier answer lookup
//         Map<String, String> seekerAnswers = new HashMap<>();
//         Map<String, String> providerAnswers = new HashMap<>();

//         seekerPrefs.getAnswers().forEach(answer -> seekerAnswers.put(answer.getQuestionId(), answer.getAnswer()));

//         providerPrefs.getAnswers().forEach(answer -> providerAnswers.put(answer.getQuestionId(), answer.getAnswer()));

//         // Compare answers for each question
//         for (String questionId : seekerAnswers.keySet()) {
//             if (providerAnswers.containsKey(questionId)) {
//                 String seekerAnswer = seekerAnswers.get(questionId);
//                 String providerAnswer = providerAnswers.get(questionId);

//                 double weight = QUESTION_WEIGHTS.getOrDefault(getQuestionType(questionId), 0.1);
//                 double score = compareAnswers(seekerAnswer, providerAnswer);

//                 totalScore += score * weight;
//                 totalWeight += weight;
//             }
//         }

//         return totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
//     }

//     private String getQuestionType(String questionId) {
//         // Implement logic to determine question type based on questionId
//         // This could be enhanced by adding a type field to the PreferenceQuestions
//         // model
//         return "other";
//     }

//     private double compareAnswers(String answer1, String answer2) {
//         if (answer1 == null || answer2 == null) {
//             return 0.0;
//         }

//         // Exact match
//         if (answer1.equals(answer2)) {
//             return 1.0;
//         }

//         // Partial match (can be enhanced based on specific answer types)
//         if (answer1.contains(answer2) || answer2.contains(answer1)) {
//             return 0.5;
//         }

//         return 0.0;
//     }
// }