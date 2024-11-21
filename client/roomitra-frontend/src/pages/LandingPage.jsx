import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../assets/RooMitra-logo.svg";
import matchedPeoplePhoto from "../assets/Matched_people.png";
import roomMateMatchingPhoto from "../assets/Roommate_matching.png";
import furnitureTradingPhoto from "../assets/Furniture_trading.png";
import communityBuildingPhoto from "../assets/Community_Building.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const [animateLogo, setAnimateLogo] = useState(true);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [showTagline, setShowTagline] = useState(true);
  const [showSelection, setShowSelection] = useState(false);

  const fullTagline = "Your perfect MITRA is just a click away!";

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
      return;
    }

    // Original animation logic
    const typingSpeed = 50;
    if (displayIndex < fullTagline.length) {
      const typingInterval = setInterval(() => {
        setDisplayIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    } else {
      setTimeout(() => {
        setShowTagline(false);
        setShowSelection(true);
      }, 2000);

      const logoTimer = setTimeout(() => {
        setAnimateLogo(false);
      }, 1500);

      return () => clearTimeout(logoTimer);
    }
  }, [displayIndex, fullTagline.length, navigate]);

  const handleSelection = (type) => {
    navigate("/userSignup", { state: { userType: type } });
  };

  return (
    <div className="bg-gray-100">
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
          animateLogo ? "opacity-100" : "opacity-0 translate-y-[-100%]"
        }`}
      >
        <img src={logo} alt="RooMitra Logo" className="w-60 h-60" />
        {showTagline && (
          <h2 className="text-2xl font-bold text-blue-600">
            {fullTagline.slice(0, displayIndex)}
          </h2>
        )}
      </div>
      {/* Header */}
      {!animateLogo && <Header />}

      {/* Why RooMitra */}
      {!animateLogo && (
        <main>
          {/* Selection Section */}
          {showSelection && (
            <section id="selection" className="text-center py-20">
              <h2 className="text-3xl font-bold mb-4">Welcome to RooMitra!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Let us help you find your perfect living situation. Choose your
                path below:
              </p>
              <div className="flex justify-center space-x-6">
                <button
                  onClick={() => handleSelection("RoomSeeker")}
                  className="bg-blue-600 text-white px-8 py-4 rounded shadow-lg hover:bg-blue-700 transition duration-300"
                >
                  🏠 I’m looking for a room to rent!
                </button>
                <button
                  onClick={() => handleSelection("RoomProvider")}
                  className="bg-green-600 text-white px-8 py-4 rounded shadow-lg hover:bg-green-700 transition duration-300"
                >
                  🛋️ I have a room and need a roommate!
                </button>
              </div>
            </section>
          )}

          {/* Why RooMitra */}
          <section className="text-center py-20">
            <h2 className="text-4xl font-bold mb-4">Why RooMitra?</h2>
            <p className="text-lg text-gray-600 mb-6">
              RooMitra is your ultimate solution for finding the perfect
              roommate or room. Say goodbye to endless searching and hello to
              convenience!
            </p>
            <img
              src={matchedPeoplePhoto}
              alt="Visual representation"
              className="mx-auto w-1/4 rounded-lg shadow-lg"
            />
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-white">
            <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
              <div className="p-6 bg-gray-200 rounded-lg shadow-lg flex flex-col items-center text-center">
                <img
                  src={roomMateMatchingPhoto}
                  alt="Room Matching"
                  className="w-32 h-32 mb-4 rounded-lg"
                />
                <h3 className="font-bold text-xl mb-2">Preference Matching</h3>
                <p className="text-gray-700">
                  Find roommates that match your preferences easily.
                </p>
              </div>
              <div className="p-6 bg-gray-200 rounded-lg shadow-lg flex flex-col items-center text-center">
                <img
                  src={communityBuildingPhoto}
                  alt="Community Building"
                  className="w-32 h-32 mb-4 rounded-lg"
                />
                <h3 className="font-bold text-xl mb-2">Community Building</h3>
                <p className="text-gray-700">
                  Connect with like-minded individuals through groups and shared
                  interests.
                </p>
              </div>
              <div className="p-6 bg-gray-200 rounded-lg shadow-lg flex flex-col items-center text-center">
                <img
                  src={furnitureTradingPhoto}
                  alt="Furniture Trading"
                  className="w-32 h-32 mb-4 rounded-lg"
                />
                <h3 className="font-bold text-xl mb-2">Furniture Trading</h3>
                <p className="text-gray-700">
                  Easily buy, sell, or exchange furniture with fellow users
                  within the platform.
                </p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20 bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-10">
              What Our Users Say
            </h2>
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg mb-4 w-1/2">
                <p>
                  "RooMitra made finding a roommate so easy! Highly recommend!"
                </p>
                <span className="block text-right text-gray-500">- User A</span>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg mb-4 w-1/2">
                <p>"I found my perfect match in no time. Great experience!"</p>
                <span className="block text-right text-gray-500">- User B</span>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-10 bg-blue-600 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Roommate?
            </h2>
            <button className="bg-white text-blue-600 px-6 py-3 rounded">
              Sign Up Now
            </button>
          </section>
        </main>
      )}

      {/* Footer */}
      {!animateLogo && <Footer />}
    </div>
  );
};

export default LandingPage;
