import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function PredictionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch prediction
  // ==========================================

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/predictions/${id}`
        );

        setPrediction(
          response.data?.data || null
        );
      } catch (err) {
        console.error(
          "Failed to load prediction:",
          err
        );

        if (err.response?.status === 401) {
          setError(
            "Your session has expired. Please sign in again."
          );
          return;
        }

        if (err.response?.status === 404) {
          setError(
            "This prediction could not be found."
          );
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load prediction details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (user && id) {
      fetchPrediction();
    } else if (!user) {
      setLoading(false);
      setError("Authentication required.");
    }
  }, [id, user]);

  // ==========================================
  // Helpers
  // ==========================================

  const formatDisease = (disease) => {
    if (!disease) return "Unknown";

    return disease
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  const formatSymptom = (symptom) => {
    if (!symptom) return "";

    return symptom
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  const getConfidenceValue = (confidence) => {
    if (
      confidence === null ||
      confidence === undefined
    ) {
      return 0;
    }

    const value = Number(confidence);

    if (Number.isNaN(value)) {
      return 0;
    }

    return Math.min(
      value <= 1 ? value * 100 : value,
      100
    );
  };

  const formatConfidence = (confidence) => {
    return `${getConfidenceValue(confidence).toFixed(
      1
    )}%`;
  };

  // ==========================================
  // Parse symptoms safely
  // ==========================================

  const getSymptoms = () => {
    if (!prediction?.symptoms) {
      return [];
    }

    if (Array.isArray(prediction.symptoms)) {
      return prediction.symptoms;
    }

    if (typeof prediction.symptoms === "string") {
      try {
        const parsed = JSON.parse(
          prediction.symptoms
        );

        return Array.isArray(parsed)
          ? parsed
          : [];
      } catch {
        return [];
      }
    }

    return [];
  };

  // ==========================================
  // Loading state
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F6FAF9]">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="flex min-h-[420px] flex-col items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#0F766E]/20 border-t-[#0F766E]" />

            <p className="mt-4 text-sm text-slate-500">
              Loading prediction...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // Error state
  // ==========================================

  if (error || !prediction) {
    return (
      <main className="min-h-screen bg-[#F6FAF9]">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="flex min-h-[420px] items-center justify-center">
            <section className="w-full max-w-lg rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7"
                >
                  <circle cx="12" cy="12" r="9" />

                  <path
                    strokeLinecap="round"
                    d="M12 8v4"
                  />

                  <path
                    strokeLinecap="round"
                    d="M12 16h.01"
                  />
                </svg>
              </div>

              <h1 className="mt-5 text-xl font-semibold text-slate-900">
                Prediction unavailable
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {error ||
                  "We couldn't find this prediction."}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                {error?.includes("session") ||
                error?.includes("Authentication") ? (
                  <Link
                    to="/login"
                    className="rounded-xl bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#115E59]"
                  >
                    Sign in again
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/history")
                    }
                    className="rounded-xl bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#115E59]"
                  >
                    Back to History
                  </button>
                )}

                <Link
                  to="/predict"
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  New Prediction
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  const symptoms = getSymptoms();

  const confidence = getConfidenceValue(
    prediction.confidence
  );

  // ==========================================
  // Render
  // ==========================================

  return (
    <main className="min-h-screen bg-[#F6FAF9]">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* Back */}

        <button
          type="button"
          onClick={() => navigate("/history")}
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#0F766E]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5M11 18l-6-6 6-6"
            />
          </svg>

          Back to history
        </button>

        {/* Result Header */}

        <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">

          <div className="border-b border-slate-100 bg-[#E7F5F2] px-5 py-7 sm:px-8 sm:py-9">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-[#0F766E]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0F766E]" />

                  AI Prediction
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-[#16302B] sm:text-4xl">
                  {formatDisease(
                    prediction.predicted_disease
                  )}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Prediction generated from your
                  reported symptoms.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl bg-white px-5 py-4 shadow-sm sm:min-w-[150px] sm:text-center">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Confidence
                </p>

                <p className="mt-1 text-2xl font-bold text-[#0F766E]">
                  {formatConfidence(
                    prediction.confidence
                  )}
                </p>

              </div>
            </div>
          </div>

          {/* Confidence Bar */}

          <div className="px-5 py-5 sm:px-8">

            <div className="flex items-center justify-between gap-4">

              <p className="text-xs font-medium text-slate-500">
                Model confidence
              </p>

              <p className="text-xs font-medium text-slate-400">
                {confidence.toFixed(1)}%
              </p>

            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-[#0F766E] transition-all duration-700"
                style={{
                  width: `${confidence}%`,
                }}
              />

            </div>
          </div>
        </section>

        {/* Information */}

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Symptoms */}

          <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">

            <div className="flex items-start justify-between gap-4">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Reported symptoms
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Symptoms used for this prediction.
                </p>
              </div>

              <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
                {symptoms.length}
              </span>
            </div>

            {symptoms.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">

                {symptoms.map((symptom) => (
                  <span
                    key={symptom}
                    className="rounded-xl bg-[#E7F5F2] px-3 py-2 text-xs font-medium text-[#0F766E]"
                  >
                    {formatSymptom(symptom)}
                  </span>
                ))}

              </div>
            ) : (
              <p className="mt-5 text-sm text-slate-400">
                No symptoms were recorded.
              </p>
            )}
          </section>

          {/* Prediction Information */}

          <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-lg font-semibold text-slate-900">
              Prediction information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Details about when this prediction was made.
            </p>

            <div className="mt-5 space-y-4">

              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">

                <span className="text-sm text-slate-500">
                  Date
                </span>

                <span className="text-right text-sm font-medium text-slate-800">
                  {formatDate(
                    prediction.created_at
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">

                <span className="text-sm text-slate-500">
                  Time
                </span>

                <span className="text-sm font-medium text-slate-800">
                  {formatTime(
                    prediction.created_at
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">

                <span className="text-sm text-slate-500">
                  Prediction ID
                </span>

                <span className="max-w-[180px] truncate text-right text-xs font-medium text-slate-400">
                  {prediction.id}
                </span>
              </div>

            </div>
          </section>
        </div>

        {/* Actions */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <Link
            to="/predict"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#115E59]"
          >
            Make another prediction

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14M5 12h14"
              />
            </svg>
          </Link>

          <Link
            to="/history"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            View prediction history
          </Link>
        </div>

        {/* Disclaimer */}

        <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50/60 px-5 py-4">

          <div className="flex gap-3">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
            >
              <circle cx="12" cy="12" r="9" />

              <path
                strokeLinecap="round"
                d="M12 8v4"
              />

              <path
                strokeLinecap="round"
                d="M12 16h.01"
              />
            </svg>

            <div>

              <p className="text-xs font-semibold text-amber-800">
                Important health information
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-800/80">
                This prediction is AI-assisted and provided
                for informational purposes only. It is not a
                medical diagnosis and should not replace
                professional medical advice, examination,
                or treatment. If you are concerned about your
                symptoms, please consult a qualified healthcare
                professional.
              </p>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
}