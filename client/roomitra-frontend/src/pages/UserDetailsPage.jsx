import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { getFullImageUrl } from "../api/axiosConfig";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";

const UserDetailsPage = () => {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
      return;
    }
    fetchUserDetails();
  }, [navigate]);

  const fetchUserDetails = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      console.log(userData);
      const userType = userData.userType.toLowerCase();
      const response = await api.get(
        `/users/details/${userType}/${userData._id}`
      );
      setUser(response.data);
      setEditedBio(response.data.bio || "");
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to load user details");
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPhotoPreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("profilePhoto", file);

      try {
        const response = await api.post("/users/upload-photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setUser({ ...user, profilePhoto: response.data.photoUrl });
        fetchUserDetails();
        toast.success("Profile photo updated!");
      } catch (error) {
        console.error("Error uploading photo:", error);
        toast.error("Failed to upload photo");
      }
    }
  };

  const handleBioSave = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const userType = userData.userType.toLowerCase();
      await api.patch(`/users/update-bio/${userType}/${userData._id}`, {
        bio: editedBio,
      });
      setUser({ ...user, bio: editedBio });
      setIsEditing(false);
      toast.success("Bio updated successfully!");
    } catch (error) {
      console.error("Error updating bio:", error);
      toast.error("Failed to update bio");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Dashboard
        </button>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>

        {/* Profile Photo Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              {photoPreview || user.profilePhoto ? (
                <img
                  src={photoPreview || getFullImageUrl(user.profilePhoto)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <FaCamera className="text-gray-400 text-2xl" />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700"
            >
              <FaCamera />
            </label>
          </div>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <p className="mt-1 text-gray-900">{user.firstName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <p className="mt-1 text-gray-900">{user.lastName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-gray-900">{user.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <p className="mt-1 text-gray-900">
              {new Date(user.dateOfBirth).toLocaleDateString()}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <p className="mt-1 text-gray-900">{user.gender}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Type
            </label>
            <p className="mt-1 text-gray-900">{user.userType}</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          {isEditing ? (
            <div className="mt-1">
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={4}
              />
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={handleBioSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-1">
              <p className="text-gray-900">{user.bio || "No bio added yet"}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 text-blue-600 hover:text-blue-700"
              >
                Edit Bio
              </button>
            </div>
          )}
        </div>

        {/* Preferences Section */}
        <div className="col-span-2 mt-6">
          <button
            onClick={() => navigate("/preferences-setup")}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update Your Roommate Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
