import React from "react";
import { useNavigate } from "react-router-dom";

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (type) => {
    navigate("/userSignup", { state: { userType: type } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Choose your account type
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select how you want to use RooMitra
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <button
              onClick={() => handleSelection("RoomSeeker")}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              🏠 I'm looking for a room
            </button>
            <button
              onClick={() => handleSelection("RoomProvider")}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              🛋️ I have a room to rent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
