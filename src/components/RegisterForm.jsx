import { useState } from "react";

export default function RegisterForm({
  formData,
  loading,
  onChange,
  onSubmit,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Full name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Your full name"
          className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10 placeholder:text-slate-400"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Email address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={onChange}
          placeholder="you@example.com"
          className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-900 outline-none transition focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10 placeholder:text-slate-400"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={formData.password}
            onChange={onChange}
            placeholder="Create a password"
            className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-slate-900 outline-none transition focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10 placeholder:text-slate-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Confirm password
        </label>

        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={onChange}
            placeholder="Confirm your password"
            className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-slate-900 outline-none transition focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10 placeholder:text-slate-400"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-600"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs leading-5 text-slate-400 pt-1">
        By creating an account, you understand that MediPredict
        predictions are not a substitute for professional medical advice.
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-13 mt-2 rounded-xl bg-[#0f766e] text-white font-medium flex items-center justify-center gap-2 transition hover:bg-[#115e59] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#0f766e]/15"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}