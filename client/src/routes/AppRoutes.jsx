import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* ==========================================
   LANDING
========================================== */

import Landing from "../pages/Landing/Landing";

/* ==========================================
   AUTH
========================================== */

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

/* ==========================================
   COMMON DASHBOARD LAYOUT
========================================== */

import DashboardLayout from "../pages/Dashboard/DashboardLayout";

/* ==========================================
   DASHBOARD
========================================== */

import Dashboard from "../pages/Dashboard/Dashboard";

/* ==========================================
   FEATURES
========================================== */

import CycleTracker from "../pages/CycleTracker/CycleTracker";
import AIPrediction from "../pages/AIPrediction/AIPrediction";
import Symptoms from "../pages/Symptoms/Symptoms";
import MedicineReminder from "../pages/MedicineReminder/MedicineReminder";
import DietNutrition from "../pages/DietNutrition/DietNutrition";
import Reports from "../pages/Reports/Reports";
import AIAssistant from "../pages/AIAssistant/AIAssistant";
import ProfileSetup from "../pages/Profile/ProfileSetup";


function AppRoutes() {
  return (
    <Routes>

      {/* ================================================
          PUBLIC ROUTES
      ================================================= */}

      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* ================================================
          DASHBOARD APPLICATION

          IMPORTANT:
          DashboardLayout contains:
          ✓ Sidebar
          ✓ Topbar

          Therefore, individual feature pages MUST NOT
          import Sidebar or Topbar again.
      ================================================= */}

      <Route
        path="/"
        element={<DashboardLayout />}
      >

        {/* ================= Dashboard ================= */}

        <Route
          path="dashboard"
          element={<Dashboard />}
        />


        {/* ================= Cycle Tracker ================= */}

        <Route
          path="cycle-tracker"
          element={<CycleTracker />}
        />


        {/* ================= AI Prediction ================= */}

        <Route
          path="prediction"
          element={<AIPrediction />}
        />


        {/* ================= Symptoms ================= */}

        <Route
          path="symptoms"
          element={<Symptoms />}
        />


        {/* ================= Medicine Reminder ================= */}

        <Route
          path="medicine-reminder"
          element={<MedicineReminder />}
        />


        {/* ================= Diet & Nutrition ================= */}

        <Route
          path="diet-nutrition"
          element={<DietNutrition />}
        />


        {/* ================= Reports ================= */}

        <Route
          path="reports"
          element={<Reports />}
        />


        {/* ================= AI Assistant ================= */}

        <Route
          path="ai-assistant"
          element={<AIAssistant />}
        />


        {/* ================= Profile ================= */}

        <Route
          path="profile"
          element={<ProfileSetup />}
        />


        {/* ================= Profile Redirect ================= */}

        <Route
          path="profile-setup"
          element={
            <Navigate
              to="/profile"
              replace
            />
          }
        />

      </Route>


      {/* ================================================
          404 ROUTE
      ================================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default AppRoutes;