import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-[#0F766E]"
        : "text-slate-600 hover:text-[#0F766E]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* ==========================================
            Logo
        ========================================== */}

        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F766E] text-white">
            <span className="text-lg font-bold">+</span>
          </div>

          <div>
            <h1 className="text-base font-bold leading-none text-[#16302B]">
              MediPredict
            </h1>

            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
              AI Health Assistant
            </p>
          </div>
        </Link>


        {/* ==========================================
            Desktop Navigation
        ========================================== */}

        <nav className="hidden items-center gap-8 md:flex">

          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className={navLinkClass}
            >
              Dashboard
            </NavLink>
          )}

          <NavLink
            to="/predict"
            className={navLinkClass}
          >
            Predict
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/history"
              className={navLinkClass}
            >
              History
            </NavLink>
          )}

        </nav>


        {/* ==========================================
            Desktop Actions
        ========================================== */}

        <div className="hidden items-center gap-3 md:flex">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 transition hover:text-[#0F766E]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-[#0F766E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#115E59]"
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Logout
            </button>
          )}

        </div>


        {/* ==========================================
            Mobile Hamburger
        ========================================== */}

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 md:hidden"
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                d="M6 6l12 12M18 6 6 18"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          )}
        </button>

      </div>


      {/* ==========================================
          Mobile Dropdown Menu
      ========================================== */}

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white md:hidden">

          <nav className="mx-auto max-w-7xl px-5 py-4 sm:px-6">

            <div className="flex flex-col">

              <NavLink
                to="/"
                onClick={closeMenu}
                className={navLinkClass}
              >
                <div className="rounded-xl px-3 py-3">
                  Home
                </div>
              </NavLink>


              {isAuthenticated && (
                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className={navLinkClass}
                >
                  <div className="rounded-xl px-3 py-3">
                    Dashboard
                  </div>
                </NavLink>
              )}


              <NavLink
                to="/predict"
                onClick={closeMenu}
                className={navLinkClass}
              >
                <div className="rounded-xl px-3 py-3">
                  Predict
                </div>
              </NavLink>


              {isAuthenticated && (
                <NavLink
                  to="/history"
                  onClick={closeMenu}
                  className={navLinkClass}
                >
                  <div className="rounded-xl px-3 py-3">
                    History
                  </div>
                </NavLink>
              )}


              <div className="my-2 border-t border-slate-100" />


              {!isAuthenticated ? (
                <>

                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className={navLinkClass}
                  >
                    <div className="rounded-xl px-3 py-3">
                      Login
                    </div>
                  </NavLink>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="mt-2 rounded-xl bg-[#0F766E] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#115E59]"
                  >
                    Get Started
                  </Link>

                </>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>
              )}

            </div>

          </nav>

        </div>
      )}

    </header>
  );
}

export default Navbar;