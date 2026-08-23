import { Routes, Route } from "react-router-dom";

import App from "../App";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Prediction from "../pages/Prediction";
import History from "../pages/History";
import PredictionDetails from "../pages/PredictionDetails";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ==========================================
          Main Application Layout
      ========================================== */}

      <Route element={<App />}>

        {/* ==========================================
            Public Routes
        ========================================== */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/predict" element={<Prediction />} />

        {/* ==========================================
            Protected Routes
        ========================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/history/:id"
            element={<PredictionDetails />}
          />

        </Route>

      </Route>
    </Routes>
  );
}