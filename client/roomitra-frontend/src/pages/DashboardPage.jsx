import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
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
      provider.location.toLowerCase().includes(search.toLowerCase()) &&
      (!filters.price || provider.price <= filters.price) &&
      (!filters.location || provider.location === filters.location) &&
      (!filters.beds || provider.beds === filters.beds) &&
      (!filters.baths || provider.baths === filters.baths) &&
      (!filters.roomType || provider.roomType === filters.roomType)
    );
  });

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header flex justify-between items-center p-4 bg-blue-500 text-white">
        <div className="search-container flex items-center">
          <FaSearch className="mr-2" />
          <input
            type="text"
            placeholder="Search by location"
            value={search}
            onChange={handleSearch}
            className="p-2 rounded"
          />
        </div>
        <FaUserCircle size={30} className="cursor-pointer" />
      </header>

      {/* Filter Section */}
      <div className="filter-section p-4 bg-gray-100 flex justify-center space-x-4">
        <select
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
          className="p-2 rounded"
        >
          <option value="">Price</option>
          <option value="500">Under $500</option>
          <option value="1000">Under $1000</option>
          <option value="1500">Under $1500</option>
        </select>
        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="p-2 rounded"
        >
          <option value="">Location</option>
          <option value="City A">City A</option>
          <option value="City B">City B</option>
          <option value="City C">City C</option>
        </select>
        <select
          name="beds"
          value={filters.beds}
          onChange={handleFilterChange}
          className="p-2 rounded"
        >
          <option value="">Beds</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3+</option>
        </select>
        <select
          name="baths"
          value={filters.baths}
          onChange={handleFilterChange}
          className="p-2 rounded"
        >
          <option value="">Baths</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3+</option>
        </select>
        <select
          name="roomType"
          value={filters.roomType}
          onChange={handleFilterChange}
          className="p-2 rounded"
        >
          <option value="">Room Type</option>
          <option value="shared">Shared</option>
          <option value="personal">Personal</option>
        </select>
      </div>

      {/* Room Cards Section */}
      <main className="room-cards-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredProviders.map((provider) => (
          <RoomCard key={provider.id} provider={provider} />
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
