import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import RegistrationPage from "./pages/RegistrationPage";
import SeekerProfileSetup from "./pages/SeekerProfileSetup";
import ProviderProfileSetup from "./pages/ProviderProfileSetup";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/userSignup" element={<RegistrationPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seeker/profile-setup"
            element={
              <ProtectedRoute>
                <SeekerProfileSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/profile-setup"
            element={
              <ProtectedRoute>
                <ProviderProfileSetup />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
