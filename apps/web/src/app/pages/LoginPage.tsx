import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-zinc-50 mb-6">
          Login to Kanon Academy
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-zinc-300 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-teal-500"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-zinc-300 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-teal-500"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-zinc-300">
              <input
                type="checkbox"
                className="form-checkbox bg-zinc-800 border-zinc-700 text-teal-500"
              />
              <span className="ml-2 text-sm">Remember me</span>
            </label>
            <a href="#" className="text-sm text-teal-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-zinc-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-teal-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
