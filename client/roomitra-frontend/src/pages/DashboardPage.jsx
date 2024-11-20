import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
      .get("/users/providers")
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header isDashboard={true} />

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
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProviders.map((provider) => (
            <RoomCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
