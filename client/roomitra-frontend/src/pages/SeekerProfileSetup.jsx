import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const SeekerProfileSetup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [preferenceQuestions, setPreferenceQuestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Redirect if no user data
    if (!user) {
      navigate("/userSignup");
      return;
    }

    // Redirect if wrong user type
    if (user.userType !== "RoomSeeker") {
      navigate("/provider/profile-setup");
      return;
    }

    // Fetch preference questions
    api
      .get("/seeker-preference-questions")
      .then((response) => setPreferenceQuestions(response.data))
      .catch((error) => {
        console.error("Error fetching questions:", error);
        toast.error("Error loading preferences");
      });
  }, [navigate, user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("profilePhoto", profilePhoto);
      formData.append("bio", data.bio);
      formData.append("preferences", JSON.stringify(data.preferences));

      await api.post("/seeker/complete-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile setup completed!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error setting up profile");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 relative">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Photo</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-4"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              {...register("bio", { required: "Bio is required" })}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>

          {/* Preference Questions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Your Preferences
            </h3>
            {preferenceQuestions.map((question) => (
              <div key={question.id}>
                <label className="block text-sm font-medium text-gray-700">
                  {question.question}
                </label>
                <select
                  {...register(`preferences.${question.id}`)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                >
                  {question.possibleAnswers.map((answer) => (
                    <option key={answer} value={answer}>
                      {answer}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Complete Profile Setup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SeekerProfileSetup;
