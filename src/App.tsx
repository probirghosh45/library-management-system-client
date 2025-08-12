import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}
