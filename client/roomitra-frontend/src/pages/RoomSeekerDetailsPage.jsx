import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaBriefcase, FaGlobe } from "react-icons/fa";
import api from "../api/axiosConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";

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
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [compatibilityScore, setCompatibilityScore] = useState(null);

  useEffect(() => {
    const fetchSeekerDetails = async () => {
      try {
        // First, get the seeker details
        const seekerResponse = await api.get(`/users/details/roomSeeker/${id}`);
        const seekerData = seekerResponse.data;

        // Only fetch nationality and occupation if IDs exist
        let nationalityName = null;
        let occupationName = null;

        if (seekerData.nationalityId) {
          const nationalityResponse = await api.get(
            `/nationalities/${seekerData.nationalityId}`
          );
          nationalityName = nationalityResponse.data.nationalityName;
        }

        if (seekerData.occupationId) {
          const occupationResponse = await api.get(
            `/occupations/${seekerData.occupationId}`
          );
          occupationName = occupationResponse.data.occupationName;
        }

        setSeekerData({
          ...seekerData,
          nationalityName,
          occupationName,
        });
      } catch (error) {
        console.error("Error fetching seeker details:", error);
      }
    };

    fetchSeekerDetails();
  }, [id]);

  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        const response = await api.get(
          `/matches/connection-status/${user._id}/${id}`
        );

        // Only set connection states if we have a valid response
        if (response.data && response.data.status !== "NONE") {
          setIsConnected(response.data.connected);
          if (response.data.status === "PENDING") {
            setConnectionStatus("PENDING");
          }
        }
      } catch (error) {
        console.error("Error checking connection status:", error);
      }
    };

    const fetchCompatibilityScore = async () => {
      try {
        const scoreResponse = await api.get(
          `/compatibility-score/${id}/${user._id}`
        );
        setCompatibilityScore(scoreResponse.data.compatibilityScore);
      } catch (error) {
        if (error.response?.status === 404) {
          setCompatibilityScore({
            error: true,
            message: error.response.data.message,
          });
        } else {
          toast.error("Error fetching compatibility score");
        }
      }
    };

    checkConnectionStatus();
    // Fetch compatibility score regardless of connection status
    if (user.userType === "RoomProvider") {
      fetchCompatibilityScore();
    }
  }, [id, user._id, user.userType]);

  if (!seekerData) return <div>Loading...</div>;
  const handleConnect = async () => {
    try {
      const response = await api.post("/matches/request", {
        providerId: user._id,
        seekerId: id,
        requestedBy: user._id,
        status: "PENDING",
      });

      // Create notification for the seeker
      await api.post("/notifications", {
        userId: id,
        type: "NEW_MATCH",
        content: `${user.firstName} ${user.lastName} wants to connect with you`,
        data: {
          providerId: user._id,
          matchId: response.data.id,
        },
      });

      toast.success("Connection request sent!");
      setConnectionStatus("PENDING");
    } catch (error) {
      console.error("Error sending connection request:", error);
      toast.error("Failed to send connection request");
    }
  };
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
              {seekerData.occupationId && seekerData.occupationName && (
                <div className="flex items-center">
                  <FaBriefcase className="text-gray-400 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Occupation</span>
                    <p className="text-gray-700">{seekerData.occupationName}</p>
                  </div>
                </div>
              )}

              {seekerData.nationalityId && seekerData.nationalityName && (
                <div className="flex items-center">
                  <FaGlobe className="text-gray-400 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Nationality</span>
                    <p className="text-gray-700">
                      {seekerData.nationalityName}
                    </p>
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
      <div className="mt-6 flex justify-center">
        {user.userType === "RoomProvider" &&
          (isConnected ? (
            <button
              onClick={() => navigate(`/chat/${id}`)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md"
            >
              Message
            </button>
          ) : (
            <button
              onClick={handleConnect}
              disabled={connectionStatus === "PENDING"}
              className={`px-6 py-2 rounded-md ${
                connectionStatus === "PENDING"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium`}
            >
              {connectionStatus === "PENDING" ? "Request Pending" : "Connect"}
            </button>
          ))}
      </div>
      {user.userType === "RoomProvider" && compatibilityScore !== null && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Compatibility Score</h3>
          {typeof compatibilityScore === "object" &&
          compatibilityScore.error ? (
            <div className="text-yellow-600">{compatibilityScore.message}</div>
          ) : (
            <>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">
                  {Number(compatibilityScore).toFixed(1)}%
                </div>
                <div
                  className={`text-sm ${
                    compatibilityScore >= 75
                      ? "text-green-600"
                      : compatibilityScore >= 50
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {compatibilityScore >= 75
                    ? "High Match"
                    : compatibilityScore >= 50
                    ? "Moderate Match"
                    : "Low Match"}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className={`h-2.5 rounded-full ${
                    compatibilityScore >= 75
                      ? "bg-green-600"
                      : compatibilityScore >= 50
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                  style={{ width: `${compatibilityScore}%` }}
                ></div>
              </div>
            </>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RoomSeekerDetailsPage;
