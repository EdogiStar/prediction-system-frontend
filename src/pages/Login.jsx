import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Message passed from Register page
  const successMessage = location.state?.message;

  // ==========================================
  // Handle input changes
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  // ==========================================
  // Handle login
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(
        formData.email.trim(),
        formData.password
      );

      // Login successful
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to sign in. Please check your credentials and try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5fbfa] flex items-center justify-center px-5 py-8">

      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(15,118,110,0.10)] grid lg:grid-cols-2">

        {/* =========================
            BRAND SECTION
        ========================== */}

        <section className="hidden lg:flex relative bg-[#0f766e] text-white p-12 xl:p-16 flex-col justify-between min-h-[680px] overflow-hidden">

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />

          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/10" />

          <div className="absolute top-1/2 -right-20 w-40 h-40 rounded-full bg-white/5" />

          {/* Brand */}

          <div className="relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s-7-4.35-9.5-9.25C.5 7.8 3.1 4 6.75 4c2.05 0 3.9 1.1 5.25 2.8C13.35 5.1 15.2 4 17.25 4 20.9 4 23.5 7.8 21.5 11.75 19 16.65 12 21 12 21Z"
                  />
                </svg>
              </div>

              <span className="text-xl font-semibold tracking-tight">
                MediPredict
              </span>
            </Link>
          </div>

          {/* Main message */}

          <div className="relative z-10 max-w-md">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              Smart health prediction
            </div>

            <h1 className="text-4xl xl:text-5xl font-semibold leading-[1.1] tracking-tight">
              Understand your symptoms with confidence.
            </h1>

            <p className="mt-6 text-white/75 text-base leading-7">
              Get a quick prediction based on your reported symptoms
              and access your health information from one simple
              platform.
            </p>

          </div>

          {/* Bottom note */}

          <div className="relative z-10">

            <div className="flex items-center gap-3 text-sm text-white/70">

              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v18M3 12h18"
                  />
                </svg>
              </div>

              <span>
                Designed to support informed health decisions.
              </span>

            </div>

          </div>

        </section>

        {/* =========================
            LOGIN SECTION
        ========================== */}

        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">

          <div className="w-full max-w-md">

            {/* Mobile brand */}

            <div className="lg:hidden mb-10">

              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >

                <div className="w-10 h-10 rounded-xl bg-[#0f766e] text-white flex items-center justify-center">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s-7-4.35-9.5-9.25C.5 7.8 3.1 4 6.75 4c2.05 0 3.9 1.1 5.25 2.8C13.35 5.1 15.2 4 17.25 4 20.9 4 23.5 7.8 21.5 11.75 19 16.65 12 21 12 21Z"
                    />
                  </svg>

                </div>

                <span className="text-xl font-semibold text-slate-900">
                  MediPredict
                </span>

              </Link>

            </div>

            {/* Heading */}

            <div className="mb-8">

              <p className="text-sm font-medium text-[#0f766e] mb-3">
                Welcome back
              </p>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                Sign in to your account
              </h2>

              <p className="mt-3 text-slate-500 leading-6">
                Continue your health journey with MediPredict.
              </p>

            </div>

            {/* Success message */}

            {successMessage && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-5 h-5 shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.5 11 14.5 15.5 9.5"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />
                </svg>

                <span>{successMessage}</span>

              </div>
            )}

            {/* Error */}

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-5 h-5 shrink-0 mt-0.5"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />

                  <path
                    strokeLinecap="round"
                    d="M12 8v4M12 16h.01"
                  />
                </svg>

                <span>{error}</span>

              </div>
            )}

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}

              <div>

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email address
                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="w-5 h-5"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />

                      <path
                        strokeLinecap="round"
                        d="m3 7 9 6 9-6"
                      />
                    </svg>

                  </div>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full h-13 rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-900 outline-none transition focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10 placeholder:text-slate-400"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-[#0f766e] hover:text-[#115e59] transition"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="w-5 h-5"
                    >
                      <rect
                        x="4"
                        y="10"
                        width="16"
                        height="11"
                        rx="2"
                      />

                      <path
                        strokeLinecap="round"
                        d="M8 10V7a4 4 0 0 1 8 0v3"
                      />
                    </svg>

                  </div>

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full h-13 rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-slate-900 outline-none transition focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10 placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-13 mt-2 rounded-xl bg-[#0f766e] text-white font-medium flex items-center justify-center gap-2 transition hover:bg-[#115e59] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#0f766e]/15"
              >

                {loading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="opacity-30"
                      />

                      <path
                        d="M21 12a9 9 0 0 0-9-9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>

                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>
                  </>
                )}

              </button>

            </form>

            {/* Register */}

            <p className="mt-8 text-center text-sm text-slate-500">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-[#0f766e] hover:text-[#115e59] transition"
              >
                Create one
              </Link>

            </p>

            {/* Security note */}

            <div className="mt-10 pt-6 border-t border-slate-100">

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3 5 6v5c0 4.5 2.9 8.5 7 10 4.1-1.5 7-5.5 7-10V6l-7-3Z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 12 2 2 4-4"
                  />
                </svg>

                Your information is handled securely.

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}