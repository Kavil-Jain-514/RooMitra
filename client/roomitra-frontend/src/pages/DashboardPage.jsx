import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoomCard from "../components/RoomCard";
import api from "../api/axiosConfig";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const isProvider = user?.userType === "RoomProvider";

  useEffect(() => {
    const endpoint = isProvider ? "/users/seekers" : "/users/providers";

    api
      .get(endpoint)
      .then((response) => {
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      })
      .catch((error) =>
        console.error(
          `Error fetching ${isProvider ? "seekers" : "providers"}:`,
          error
        )
      );
  }, [isProvider]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header isDashboard={true} />

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
