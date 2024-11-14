import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/userSignup" state={{ from: location }} replace />;
  }

  // Check if user is accessing the correct profile setup page
  const path = location.pathname;
  const isSeeker = user.userType === "RoomSeeker";
  const isProvider = user.userType === "RoomProvider";

  if (path.includes("/seeker/") && !isSeeker) {
    return <Navigate to="/provider/profile-setup" replace />;
  }

  if (path.includes("/provider/") && !isProvider) {
    return <Navigate to="/seeker/profile-setup" replace />;
  }

  return children;
};

export default ProtectedRoute;
