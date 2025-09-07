import { Routes, Route } from "react-router-dom";
import { AuthRoutes } from "./features/auth";
import HomePage from "./pages/HomePage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
    </Routes>
  );
}
