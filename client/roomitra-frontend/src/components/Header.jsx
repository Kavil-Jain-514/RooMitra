import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../assets/RooMitra-logo.svg";
import { FaBell, FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";
import api from "../api/axiosConfig";

const Header = ({ isDashboard, onSearch, searchPlaceholder }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const notificationRef = useRef(null);

  const shouldShowDashboardHeader =
    isDashboard || location.pathname.includes("/seeker-details/");

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user && user._id) {
        try {
          const response = await api.get(`/notifications/user/${user._id}`);
          setNotifications(response.data);
          setUnreadCount(response.data.filter((notif) => !notif.isRead).length);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, []);

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

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center flex-1">
            <a href={shouldShowDashboardHeader ? "/dashboard" : "#selection"}>
              <img src={logo} alt="RooMitra Logo" className="h-20 w-auto" />
            </a>
            {shouldShowDashboardHeader && (
              <div className="max-w-lg w-full lg:max-w-xs ml-4">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={searchPlaceholder || "Search"}
                    onChange={handleSearchChange}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {shouldShowDashboardHeader ? (
            <div className="flex items-center space-x-4">
              <div className="relative" ref={notificationRef}>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FaBell className="text-gray-600 text-xl" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification._id}
                            className={`px-4 py-3 hover:bg-gray-50 ${
                              !notification.isRead ? "bg-blue-50" : ""
                            }`}
                          >
                            <p className="text-sm text-gray-800">
                              {notification.content}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(
                                notification.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
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
