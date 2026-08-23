import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
  // Handle registration
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic frontend validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password
      );

      // Registration successful.
      // User must sign in manually.
      navigate("/login", {
        replace: true,
        state: {
          message:
            "Account created successfully. Please sign in to continue.",
        },
      });
    } catch (error) {
      console.error("Registration error:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to create your account. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5fbfa] flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(15,118,110,0.10)] grid lg:grid-cols-2">

        {/* Desktop Brand Section */}
        <section className="hidden lg:flex relative bg-[#0f766e] text-white p-12 xl:p-16 flex-col justify-between min-h-[720px] overflow-hidden">

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/10" />
          <div className="absolute top-1/2 -right-20 w-40 h-40 rounded-full bg-white/5" />

          {/* Logo */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                <span className="text-xl">+</span>
              </div>

              <span className="text-xl font-semibold">
                MediPredict
              </span>
            </Link>
          </div>

          {/* Message */}
          <div className="relative z-10 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              Your health, simplified
            </div>

            <h1 className="text-4xl xl:text-5xl font-semibold leading-[1.1]">
              Start understanding your health better.
            </h1>

            <p className="mt-6 text-white/75 leading-7">
              Create your account to access personalized predictions,
              manage your health information, and keep track of your
              prediction history.
            </p>
          </div>

          {/* Bottom */}
          <div className="relative z-10">
            <p className="text-sm text-white/70">
              Built to support informed health decisions.
            </p>
          </div>
        </section>

        {/* Register Form Section */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="lg:hidden mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0f766e] text-white flex items-center justify-center">
                  <span className="text-lg">+</span>
                </div>

                <span className="text-xl font-semibold text-slate-900">
                  MediPredict
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <p className="text-sm font-medium text-[#0f766e] mb-3">
                Get started
              </p>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-3 text-slate-500 leading-6">
                Join MediPredict and take the next step toward
                understanding your symptoms.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Registration Form */}
            <RegisterForm
              formData={formData}
              loading={loading}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />

            {/* Login Link */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#0f766e] hover:text-[#115e59]"
              >
                Sign in
              </Link>
            </p>

          </div>
        </section>

      </div>
    </main>
  );
}