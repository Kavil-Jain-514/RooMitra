import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle, FaBell, FaSignOutAlt } from "react-icons/fa";
import RoomCard from "../components/RoomCard";
import api from "../api/axiosConfig";

const Dashboard = () => {
  const [roomProviders, setRoomProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    price: "",
    location: "",
    beds: "",
    baths: "",
    roomType: "",
  });

  useEffect(() => {
    api
      .get("/roomProviders")
      .then((response) => setRoomProviders(response.data))
      .catch((error) => console.error("Error fetching room providers:", error));
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const filteredProviders = roomProviders.filter((provider) => {
    return (
      provider.location?.toLowerCase().includes(search.toLowerCase()) &&
      (!filters.price || provider.price <= filters.price) &&
      (!filters.location || provider.location === filters.location) &&
      (!filters.beds || provider.beds === filters.beds) &&
      (!filters.baths || provider.baths === filters.baths) &&
      (!filters.roomType || provider.roomType === filters.roomType)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center flex-1">
              <h1 className="text-2xl font-bold text-gray-900">RooMitra</h1>
              <div className="ml-8 flex-1 max-w-lg">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaBell className="text-gray-600 text-xl" />
              </button>
              <div className="flex items-center space-x-2">
                <FaUserCircle className="text-gray-600 text-2xl" />
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <FaSignOutAlt className="text-gray-600 text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries({
              price: ["Price Range", ["500", "1000", "1500"]],
              location: ["Location", ["City A", "City B", "City C"]],
              beds: ["Bedrooms", ["1", "2", "3+"]],
              baths: ["Bathrooms", ["1", "2", "3+"]],
              roomType: ["Room Type", ["shared", "personal"]],
            }).map(([key, [label, options]]) => (
              <div key={key}>
                <select
                  name={key}
                  value={filters[key]}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {key === "price" ? `Under $${option}` : option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Room Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProviders.map((provider) => (
            <RoomCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
