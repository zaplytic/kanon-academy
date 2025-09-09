import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-neutral-text mb-4">
          Welcome to Kanon Academy
        </h1>
        <p className="text-xl text-neutral-600 mb-8">
          A convenient and accessible learning platform for everyone.
        </p>
        <Link
          to="/auth/register"
          className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-full text-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
