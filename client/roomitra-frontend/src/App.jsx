import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/userSignup" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
