import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-neutral-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-display text-2xl font-bold text-neutral-text flex items-center gap-2"
        >
          <img
            src="/assets/logo.png"
            alt="Kanon Academy Logo"
            className="h-8 object-cover"
          />
          <span className="pt-1">Kanon Academy</span>
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              to="/auth/login"
              className="text-neutral-text font-medium hover:text-primary"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/auth/register"
              className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-md"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
