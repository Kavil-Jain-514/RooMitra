import React from "react";
import {
  FaStar,
  FaBed,
  FaBath,
  FaHome,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";

const RoomCard = ({ provider, isProviderView }) => {
  console.log("RoomCard received props:", { provider, isProviderView });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={provider.profilePhoto || "https://via.placeholder.com/300x200"}
        alt={`${provider.firstName}'s profile`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {provider.firstName} {provider.lastName}
          </h3>
          {provider.rating && (
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">{provider.rating}</span>
            </div>
          )}
        </div>

        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="text-gray-400 mr-1" />
          <p className="text-gray-600">
            {provider.location || "Location not specified"}
          </p>
        </div>

        {isProviderView ? (
          // Seeker Profile Details
          <div className="space-y-2">
            <div className="flex items-center">
              <FaUser className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {provider.gender}, {calculateAge(provider.dateOfBirth)} years
              </span>
            </div>
            {provider.occupation && (
              <p className="text-sm text-gray-600">
                Occupation: {provider.occupation}
              </p>
            )}
            {provider.bio && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {provider.bio}
              </p>
            )}
          </div>
        ) : (
          // Room Provider Details
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center">
              <FaBed className="text-gray-400 mr-1" />
              <span className="text-sm text-gray-600">{provider.beds}</span>
            </div>
            <div className="flex items-center">
              <FaBath className="text-gray-400 mr-1" />
              <span className="text-sm text-gray-600">{provider.baths}</span>
            </div>
            <div className="flex items-center">
              <FaHome className="text-gray-400 mr-1" />
              <span className="text-sm text-gray-600">{provider.roomType}</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          {!isProviderView && provider.price && (
            <span className="text-lg font-bold text-blue-600">
              ${provider.price}/mo
            </span>
          )}
          <button
            onClick={() => (window.location.href = `/profile/${provider._id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  );
};

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

export default RoomCard;
