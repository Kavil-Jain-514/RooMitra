import React from "react";
import { FaStar, FaBed, FaBath, FaHome } from "react-icons/fa";

const RoomCard = ({ provider }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={provider.photo || "https://via.placeholder.com/300x200"}
        alt={provider.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {provider.name}
          </h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">{provider.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-2">{provider.location}</p>
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
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            ${provider.price}/mo
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
