import AppRouter from "./router";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <main>
        <AppRouter />
      </main>
    </div>
  );
}
