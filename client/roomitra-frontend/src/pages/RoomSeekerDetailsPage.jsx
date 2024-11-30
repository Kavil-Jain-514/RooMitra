import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaStar,
  FaLanguage,
  FaGlobe,
} from "react-icons/fa";
import api from "../api/axiosConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";

const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const RoomSeekerDetailsPage = () => {
  const { id } = useParams();
  const [seekerData, setSeekerData] = useState(null);

  useEffect(() => {
    const fetchSeekerDetails = async () => {
      try {
        const response = await api.get(`/users/details/roomSeeker/${id}`);
        setSeekerData(response.data);
      } catch (error) {
        console.error("Error fetching seeker details:", error);
      }
    };

    fetchSeekerDetails();
  }, [id]);

  if (!seekerData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header isDashboard={true} hideSearch={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-4">
              <img
                src={
                  seekerData.profilePhoto || "https://via.placeholder.com/100"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">
                  {seekerData.firstName} {seekerData.lastName}
                </h1>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <FaUser className="text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      {seekerData.gender},{" "}
                      {calculateAge(seekerData.dateOfBirth)} years
                    </span>
                  </div>
                  {/* {seekerData.rating && (
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-gray-600">{seekerData.rating}</span>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seekerData.occupationId && (
                <div className="flex items-center">
                  <FaBriefcase className="text-gray-400 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Occupation</span>
                    <p className="text-gray-700">{seekerData.occupationId}</p>
                  </div>
                </div>
              )}

              {seekerData.nationalityId && (
                <div className="flex items-center">
                  <FaGlobe className="text-gray-400 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Nationality</span>
                    <p className="text-gray-700">{seekerData.nationalityId}</p>
                  </div>
                </div>
              )}

              {/* {seekerData.languages && (
                <div className="flex items-center">
                  <FaLanguage className="text-gray-400 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Languages</span>
                    <p className="text-gray-700">
                      {seekerData.languages.join(", ")}
                    </p>
                  </div>
                </div>
              )} */}

              {seekerData.bio && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">About Me</h3>
                  <p className="text-gray-700">{seekerData.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoomSeekerDetailsPage;