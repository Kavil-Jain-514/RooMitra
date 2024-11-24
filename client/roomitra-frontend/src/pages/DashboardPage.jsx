import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoomCard from "../components/RoomCard";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isProvider = user?.userType === "RoomProvider";

  useEffect(() => {
    // Fetch room descriptions for provider
    const checkRoomDescription = async () => {
      try {
        const response = await api.get(
          `/room-description/provider/${user._id}`
        );
        const roomDescriptions = response.data;
        // Only show popup if provider has no room descriptions
        setShowPopup(isProvider && roomDescriptions.length === 0);
      } catch (error) {
        console.error("Error fetching room descriptions:", error);
        // If there's an error fetching, assume no room descriptions exist
        setShowPopup(isProvider);
      }
    };

    const fetchUsers = async () => {
      const endpoint = isProvider ? "/users/seekers" : "/users/providers";
      try {
        const response = await api.get(endpoint);
        setUsers(response.data);
      } catch (error) {
        console.error(
          `Error fetching ${isProvider ? "seekers" : "providers"}:`,
          error
        );
      }
    };

    if (isProvider) {
      checkRoomDescription();
    }
    fetchUsers();
  }, [isProvider, user?._id]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header isDashboard={true} />

      {/* Add Room Details Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Your Room Details</h3>
            <p className="text-gray-600 mb-6">
              Please add your room details to help seekers find your listing.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Later
              </button>
              <button
                onClick={() => navigate("/add-room-details")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Room Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Cards Grid */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-2xl font-bold mb-6">
          {isProvider ? "Available Room Seekers" : "Available Room Providers"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <RoomCard
              key={user._id}
              provider={user}
              isProviderView={isProvider}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
