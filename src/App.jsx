import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#F6FAF9]">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
}

export default App;