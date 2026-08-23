import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Wait until AuthContext finishes restoring
  // the user's session from localStorage.
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6FAF9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#0F766E]/20 border-t-[#0F766E] rounded-full animate-spin" />

          <p className="text-sm text-slate-500">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          message: "Please sign in to continue.",
        }}
      />
    );
  }

  // User is authenticated
  return <Outlet />;
}