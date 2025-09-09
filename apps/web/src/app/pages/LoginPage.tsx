import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="bg-neutral-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-neutral-text mb-6">
          Login to Kanon Academy
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-neutral-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-neutral-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-neutral-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-neutral-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-neutral-600">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 bg-neutral-100 border-neutral-300 rounded text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-neutral-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-primary hover:underline font-medium"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
