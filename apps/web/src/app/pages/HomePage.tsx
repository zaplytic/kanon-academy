import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-zinc-900">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-zinc-50 mb-4">
          Welcome to Kanon Academy
        </h1>
        <p className="text-xl text-zinc-300 mb-8">
          A convenient and accessible learning platform for everyone.
        </p>
        <Link
          to="/auth/register"
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
