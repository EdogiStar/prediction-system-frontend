import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Footer() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* ==========================================
              Brand
          ========================================== */}

          <div>

            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F766E] text-white">
                <span className="text-lg font-bold">+</span>
              </div>

              <div>

                <p className="text-sm font-bold text-[#16302B]">
                  MediPredict
                </p>

                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  AI Health Assistant
                </p>

              </div>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              AI-assisted health insights designed to help you
              better understand your reported symptoms.
            </p>

          </div>


          {/* ==========================================
              Links
          ========================================== */}

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">

            <Link
              to="/"
              className="text-slate-500 transition hover:text-[#0F766E]"
            >
              Home
            </Link>


            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-slate-500 transition hover:text-[#0F766E]"
              >
                Dashboard
              </Link>
            )}


            <Link
              to="/predict"
              className="text-slate-500 transition hover:text-[#0F766E]"
            >
              Predict
            </Link>


            {isAuthenticated && (
              <Link
                to="/history"
                className="text-slate-500 transition hover:text-[#0F766E]"
              >
                History
              </Link>
            )}


            {!isAuthenticated ? (
              <Link
                to="/login"
                className="text-slate-500 transition hover:text-[#0F766E]"
              >
                Login
              </Link>
            ) : (
              <button
                type="button"
                onClick={logout}
                className="text-slate-500 transition hover:text-red-600"
              >
                Logout
              </button>
            )}

          </div>

        </div>


        {/* ==========================================
            Bottom
        ========================================== */}

        <div className="mt-8 border-t border-slate-100 pt-6">

          <p className="text-xs leading-5 text-slate-400">
            © {new Date().getFullYear()} MediPredict. AI-assisted
            predictions are not a substitute for professional
            medical advice.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;