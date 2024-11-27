import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/RooMitra-logo.svg";
import { FaBell, FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";
import api from "../api/axiosConfig";

const Header = ({ isDashboard = false, hideSearch = false }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await api.post("/users/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Clear local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Redirect to landing page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center flex-1">
            <a href={isDashboard ? "/dashboard" : "#selection"}>
              <img src={logo} alt="RooMitra Logo" className="h-20 w-auto" />
            </a>
            {isDashboard && !hideSearch && (
              <div className="ml-8 flex-1 max-w-lg">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {isDashboard ? (
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaBell className="text-gray-600 text-xl" />
              </button>
              <div className="flex items-center space-x-2">
                <Link to="/user-details">
                  <FaUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaSignOutAlt className="text-gray-600 text-xl" />
                </button>
              </div>
            </div>
          ) : (
            <nav>
              <a
                href="#features"
                className="mx-4 text-gray-700 hover:text-blue-600"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="mx-4 text-gray-700 hover:text-blue-600"
              >
                Testimonials
              </a>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
