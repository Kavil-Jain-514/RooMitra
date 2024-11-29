import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  bio: yup
    .string()
    .required("Bio is required")
    .min(50, "Bio must be at least 50 characters")
    .max(500, "Bio cannot exceed 500 characters"),
  preferences: yup.object().shape({
    // Add dynamic validation based on preference questions
  }),
  roomDescription: yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    rent: yup.number().required("Rent is required").min(0),
  }),
});

const ProviderProfileSetup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [preferenceQuestions, setPreferenceQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch provider preference questions
    api
      .get("/provider-preference-questions")
      .then((response) => setPreferenceQuestions(response.data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

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
      formData.append("profilePhoto", profilePhoto);
      formData.append("bio", data.bio);
      formData.append("preferences", JSON.stringify(data.preferences));
      formData.append("roomDescription", JSON.stringify(data.roomDescription));

      await api.post("/provider/complete-profile", formData, {
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

          {/* Room Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Room Details</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Square Footage
              </label>
              <input
                type="number"
                {...register("roomDescription.sqft", { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Rooms
              </label>
              <input
                type="number"
                {...register("roomDescription.rooms", { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Has Patio?
                </label>
                <input
                  type="checkbox"
                  {...register("roomDescription.patio")}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Has Washer/Dryer?
                </label>
                <input
                  type="checkbox"
                  {...register("roomDescription.washerDryer")}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stovetop Type
              </label>
              <select
                {...register("roomDescription.stovetop", { required: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              >
                <option value="GAS">Gas</option>
                <option value="ELECTRIC">Electric</option>
              </select>
            </div>

            {/* Add more room description fields as needed */}
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

export default ProviderProfileSetup;
