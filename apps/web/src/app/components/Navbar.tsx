import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-zinc-950 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-zinc-50 flex items-center"
        >
          <img
            src="/assets/logo.png"
            alt="Kanon Academy Logo"
            className="h-8 object-cover"
          />
          Kanon Academy
        </Link>
        <div className="text-md font-bold">API Status: </div>
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/auth/login" className="text-zinc-300 hover:text-zinc-50">
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/auth/register"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
