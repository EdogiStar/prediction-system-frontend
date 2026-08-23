import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
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

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-[#0F766E] transition hover:text-[#115E59]"
          >
            Home
          </Link>

          <Link
            to="/predict"
            className="text-sm font-medium text-slate-600 transition hover:text-[#0F766E]"
          >
            Predict
          </Link>

          <Link
            to="/history"
            className="text-sm font-medium text-slate-600 transition hover:text-[#0F766E]"
          >
            History
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm font-medium text-slate-600 transition hover:text-[#0F766E] sm:block"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-[#0F766E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#115E59]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;