import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaHome,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";
import api from "../api/axiosConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";

const RoomProviderDetailsPage = () => {
  const { id } = useParams();
  const [providerData, setProviderData] = useState(null);
  const [roomDescription, setRoomDescription] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const [providerRes, roomRes] = await Promise.all([
          api.get(`/users/details/roomProvider/${id}`),
          api.get(`/room-description/provider/${id}`),
        ]);
        setProviderData(providerRes.data);
        setRoomDescription(roomRes.data[0]);
        console.log(roomRes.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchProviderDetails();
  }, [id]);

  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        const response = await api.get(
          `/matches/connection-status/${user._id}/${id}`
        );
        setIsConnected(response.data.connected);
        if (response.data.status === "PENDING") {
          setConnectionStatus("PENDING");
        }
      } catch (error) {
        console.error("Error checking connection status:", error);
      }
    };

    checkConnectionStatus();
  }, [id, user._id]);

  const handleConnect = async () => {
    try {
      const response = await api.post("/matches/request", {
        seekerId: user._id,
        providerId: id,
        requestedBy: user._id,
        status: "PENDING",
      });

      // Create notification for the provider
      await api.post("/notifications", {
        userId: id,
        type: "NEW_MATCH",
        content: `${user.firstName} ${user.lastName} wants to connect with you`,
        data: {
          seekerId: user._id,
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

  if (!providerData || !roomDescription) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header isDashboard={true} hideSearch={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Provider Profile Section */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-4">
              <img
                src={
                  providerData.profilePhoto || "https://via.placeholder.com/100"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">
                  {providerData.firstName} {providerData.lastName}
                </h1>
                <p className="text-gray-600">
                  {providerData.gender}, {providerData.occupation}
                </p>
                {providerData.bio && (
                  <p className="text-gray-700 mt-2">{providerData.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Room Images Section */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Room Images</h2>
            {roomDescription.photoUrls &&
            roomDescription.photoUrls.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {roomDescription.photoUrls.map((photo, index) => (
                  <div key={index} className="relative aspect-w-16 aspect-h-9">
                    <img
                      src={photo}
                      alt={`Room view ${index + 1}`}
                      className="object-cover w-full h-full rounded-lg image-loading"
                      onLoad={(e) => {
                        e.target.classList.remove("image-loading");
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Image+Not+Found";
                        e.target.classList.remove("image-loading");
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No room images available</p>
            )}
          </div>

          {/* Room Details Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Room Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-gray-500 mr-2" />
                  <h3 className="font-medium">Location</h3>
                </div>
                <p className="text-gray-700">
                  {roomDescription.streetName},{" "}
                  {roomDescription.apartmentNumber}
                  <br />
                  {roomDescription.city}, {roomDescription.zipcode}
                </p>
              </div>

              {/* Room Specifications */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaBed className="text-gray-500 mr-2" />
                    <span>{roomDescription.rooms} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="text-gray-500 mr-2" />
                    <span>{roomDescription.bath} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <FaHome className="text-gray-500 mr-2" />
                    <span>{roomDescription.roomType}</span>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="text-gray-500 mr-2" />
                    <span>{roomDescription.rent}/month</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {roomDescription.patio && <span>✓ Patio</span>}
                  {roomDescription.washerDryer && <span>✓ Washer/Dryer</span>}
                  {roomDescription.petFriendly && <span>✓ Pet Friendly</span>}
                  {roomDescription.dishwasher && <span>✓ Dishwasher</span>}
                  {roomDescription.inHouseOven && <span>✓ In-house Oven</span>}
                  {roomDescription.refrigerator && <span>✓ Refrigerator</span>}
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-700">
                  {roomDescription.societyDescription}
                </p>
                {roomDescription.comments && (
                  <p className="text-gray-700 mt-2">
                    {roomDescription.comments}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        {user.userType === "RoomSeeker" &&
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
      <Footer />
    </div>
  );
};

export default RoomProviderDetailsPage;
