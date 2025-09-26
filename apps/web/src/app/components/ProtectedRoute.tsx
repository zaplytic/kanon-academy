import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export function ProtectedRoute() {
  const { token } = useAuthStore();

  if (!token) {
    // If there is no token, redirect to the login page
    return <Navigate to="/auth/login" replace />;
  }

  // If a token exists, render the child route component (e.g., DashboardPage)
  return <Outlet />;
}
