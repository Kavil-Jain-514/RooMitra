import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PreferenceQuestionCard from "../components/PreferenceQuestionCard";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const PreferencesSetupPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isProvider = user?.userType === "RoomProvider";

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Fetch questions based on user type
    const endpoint = isProvider
      ? "/provider-preference-questions"
      : "/seeker-preference-questions";

    api
      .get(endpoint)
      .then((response) => setQuestions(response.data))
      .catch((error) => {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions");
      });
  }, [navigate, user, isProvider]);

  const handleAnswerSelect = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers({
      ...answers,
      [currentQuestion._id]: answer,
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      submitPreferences();
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      submitPreferences();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const submitPreferences = async () => {
    try {
      const endpoint = isProvider
        ? "/provider/preferences"
        : "/seeker/preferences";

      const preferencesData = {
        userId: user._id,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      };
      console.log(preferencesData);
      await api.post(endpoint, preferencesData);
      toast.success("Preferences saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save preferences");
    }
  };

  if (questions.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>
          <p className="text-center mt-2 text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <PreferenceQuestionCard
          question={questions[currentQuestionIndex]}
          currentAnswer={answers[questions[currentQuestionIndex]._id]}
          onAnswerSelect={handleAnswerSelect}
          onSkip={handleSkip}
          onBack={handleBack}
          isFirstQuestion={currentQuestionIndex === 0}
        />
      </div>
    </div>
  );
};

export default PreferencesSetupPage;
