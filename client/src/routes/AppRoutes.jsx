import { Routes, Route, Navigate } from "react-router-dom";

// Landing
import Landing from "../pages/Landing/Landing";

// Auth
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Dashboard
import Dashboard from "../pages/Dashboard/Dashboard";

// Profile
import ProfileSetup from "../pages/Profile/ProfileSetup";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Profile */}
      <Route path="/profile" element={<ProfileSetup />} />
      <Route
        path="/profile-setup"
        element={<Navigate to="/profile" replace />}
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;