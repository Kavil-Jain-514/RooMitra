import React from "react";
import { FaStar } from "react-icons/fa";

const RoomCard = ({ provider }) => {
  return (
    <div className="room-card bg-white rounded shadow-lg p-4">
      <img
        src={provider.photo}
        alt="Room"
        className="rounded-t-lg w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl">{provider.name}</h3>
        <p className="text-gray-700">{provider.location}</p>
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-500" />
          <span className="ml-1">{provider.rating}</span>
        </div>
        <p className="text-gray-600">${provider.price} / month</p>
        <p className="text-sm text-gray-500">
          Posted on: {provider.postingDate}
        </p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
