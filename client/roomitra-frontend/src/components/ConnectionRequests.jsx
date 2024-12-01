import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-hot-toast";

const ConnectionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [userNames, setUserNames] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get(`/matches/pending/${user._id}`);
      setRequests(response.data);
      fetchUserNames(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load connection requests");
    }
  };

  const fetchUserNames = async (requests) => {
    for (const request of requests) {
      try {
        const userType =
          user.userType === "RoomSeeker" ? "roomprovider" : "roomseeker";
        const userId =
          user.userType === "RoomSeeker"
            ? request.providerId
            : request.seekerId;
        const nameResponse = await api.get(`/users/name/${userType}/${userId}`);
        setUserNames((prev) => ({
          ...prev,
          [userId]: nameResponse.data,
        }));
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    }
  };

  const handleRequest = async (requestId, status) => {
    try {
      await api.put(`/matches/${requestId}?status=${status}`, {
        message: `Request ${status.toLowerCase()}ed`,
      });

      const request = requests.find((req) => req._id === requestId);
      const otherUserId =
        user.userType === "RoomSeeker"
          ? request?.providerId
          : request?.seekerId;

      if (request) {
        await api.post("/notifications", {
          userId: otherUserId,
          type: "CONNECTION_RESPONSE",
          content: `${user.firstName} ${
            user.lastName
          } has ${status.toLowerCase()} your connection request`,
          data: {
            matchId: requestId,
            status,
          },
        });

        toast.success(`Request ${status.toLowerCase()}`);
        fetchRequests();
      } else {
        toast.error("Request not found");
      }
    } catch (error) {
      console.error("Error handling request:", error);
      toast.error("Failed to process request");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Connection Requests
      </h2>
      {requests.length === 0 ? (
        <p className="text-center text-gray-500">
          No connection requests available.
        </p>
      ) : (
        requests.map((request) => {
          const userId =
            user.userType === "RoomSeeker"
              ? request.providerId
              : request.seekerId;
          const userName = userNames[userId];
          return (
            <div
              key={request._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <p className="text-gray-800">
                {userName
                  ? `${userName.firstName} ${userName.lastName}`
                  : "Unknown"}{" "}
                wants to connect.
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleRequest(request._id, "ACCEPT")}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequest(request._id, "REJECT")}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ConnectionRequests;
