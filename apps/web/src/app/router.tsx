import { Routes, Route } from "react-router-dom";
import { AuthRouter } from "./pages/auth";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
