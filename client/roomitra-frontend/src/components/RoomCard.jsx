import React from "react";
import {
  FaStar,
  FaBed,
  FaBath,
  FaHome,
  FaUser,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ provider, isProviderView }) => {
  const navigate = useNavigate();
  const providerData = isProviderView ? provider : provider.provider;
  const roomDescription = !isProviderView ? provider.roomDescription : null;

  const handleCardClick = () => {
    if (isProviderView) {
      navigate(`/seeker-details/${provider._id}`);
    } else {
      navigate(`/provider-details/${provider.provider._id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <img
        src={providerData.profilePhoto || "https://via.placeholder.com/300x200"}
        alt={`${providerData.firstName}'s profile`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {providerData.firstName} {providerData.lastName}
          </h3>
          {providerData.rating && (
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">
                {providerData.rating}
              </span>
            </div>
          )}
        </div>

        {!isProviderView && roomDescription && (
          <>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-gray-400 mr-1" />
              <p className="text-gray-600">
                {roomDescription.city}, {roomDescription.zipcode}
              </p>
            </div>

            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center">
                <FaBed className="text-gray-400 mr-1" />
                <span className="text-sm text-gray-600">
                  {roomDescription.bed}
                </span>
              </div>
              <div className="flex items-center">
                <FaBath className="text-gray-400 mr-1" />
                <span className="text-sm text-gray-600">
                  {roomDescription.bath}
                </span>
              </div>
              <div className="flex items-center">
                <FaHome className="text-gray-400 mr-1" />
                <span className="text-sm text-gray-600">
                  {roomDescription.roomType}
                </span>
              </div>
              <div className="flex items-center">
                <FaDollarSign className="text-gray-400 mr-1" />
                <span className="text-sm text-gray-600">
                  {roomDescription.rent}/month
                </span>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-2">
              <p className="line-clamp-2">
                {roomDescription.societyDescription}
              </p>
            </div>
          </>
        )}

        {isProviderView && (
          // Existing seeker view code
          <div className="space-y-2">
            <div className="flex items-center">
              <FaUser className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {providerData.gender}, {calculateAge(providerData.dateOfBirth)}{" "}
                years
              </span>
            </div>
            {providerData.occupation && (
              <p className="text-sm text-gray-600">
                Occupation: {providerData.occupation}
              </p>
            )}
            {providerData.bio && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {providerData.bio}
              </p>
            )}
          </div>
        )}
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
