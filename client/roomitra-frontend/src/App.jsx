import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import LandingPage from "./pages/LandingPage";
import RoomSeekerRegistration from "./components/RoomSeekerRegistration";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/roomSeekerSignup"
            element={<RoomSeekerRegistration />}
          />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/roomProviderSignup" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
