import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function History() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch prediction history
  // ==========================================

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/predictions");

        setPredictions(
          Array.isArray(response.data?.data)
            ? response.data.data
            : []
        );
      } catch (err) {
        console.error(
          "Failed to load prediction history:",
          err
        );

        if (err.response?.status === 401) {
          setError(
            "Your session has expired. Please sign in again."
          );

          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load your prediction history."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchHistory();
    } else {
      setLoading(false);
      setError("Authentication required.");
    }
  }, [token]);

  // ==========================================
  // Format disease
  // ==========================================

  const formatDisease = (disease) => {
    if (!disease) return "Unknown";

    return disease
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  // ==========================================
  // Format symptom
  // ==========================================

  const formatSymptom = (symptom) => {
    if (!symptom) return "";

    return symptom
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  // ==========================================
  // Format date
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // Format time
  // ==========================================

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

  // ==========================================
  // Format confidence
  // ==========================================

  const formatConfidence = (confidence) => {
    if (
      confidence === null ||
      confidence === undefined
    ) {
      return "—";
    }

    const value = Number(confidence);

    if (Number.isNaN(value)) {
      return confidence;
    }

    const percentage =
      value <= 1 ? value * 100 : value;

    return `${percentage.toFixed(1)}%`;
  };

  // ==========================================
  // Open prediction details
  // ==========================================

  const openPrediction = (id) => {
    navigate(`/history/${id}`);
  };

  return (
    <main className="min-h-screen bg-[#F6FAF9]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* Header */}

        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="mb-2 text-sm font-medium text-[#0F766E]">
              Prediction History
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Your health insights
            </h1>

            <p className="mt-3 max-w-2xl leading-6 text-slate-500">
              Review the disease predictions you've made
              with MediPredict.
            </p>
          </div>

          <Link
            to="/predict"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#115E59]"
          >
            New Prediction

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
        </section>

        {/* Loading */}

        {loading && (
          <section className="rounded-3xl border border-slate-100 bg-white p-10 shadow-sm">
            <div className="flex min-h-[260px] flex-col items-center justify-center gap-4">

              <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#0F766E]/20 border-t-[#0F766E]" />

              <p className="text-sm text-slate-500">
                Loading your history...
              </p>

            </div>
          </section>
        )}

        {/* Error */}

        {!loading && error && (
          <section className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex flex-col items-center text-center">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
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

              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                Unable to load history
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {error}
              </p>

              {error.includes("session") && (
                <Link
                  to="/login"
                  className="mt-5 rounded-xl bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#115E59]"
                >
                  Sign in again
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          predictions.length === 0 && (
            <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:p-12">

              <div className="flex flex-col items-center text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E7F5F2] text-[#0F766E]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                    />

                    <path
                      strokeLinecap="round"
                      d="M8 8h8M8 12h8M8 16h5"
                    />
                  </svg>
                </div>

                <h2 className="mt-5 text-xl font-semibold text-slate-900">
                  No predictions yet
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Your completed predictions will appear
                  here. Start by checking the symptoms
                  you're experiencing.
                </p>

                <Link
                  to="/predict"
                  className="mt-6 rounded-xl bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#115E59]"
                >
                  Make your first prediction
                </Link>

              </div>
            </section>
          )}

        {/* History */}

        {!loading &&
          !error &&
          predictions.length > 0 && (
            <section className="space-y-4">

              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-900">
                    {predictions.length}
                  </span>{" "}
                  {predictions.length === 1
                    ? "prediction"
                    : "predictions"}
                </p>
              </div>

              <div className="space-y-3">

                {predictions.map((prediction) => {
                  const symptoms = Array.isArray(
                    prediction.symptoms
                  )
                    ? prediction.symptoms
                    : [];

                  return (
                    <article
                      key={prediction.id}
                      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-slate-200 hover:shadow-md sm:p-6"
                    >

                      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                              {formatDisease(
                                prediction.predicted_disease
                              )}
                            </h2>

                            <span className="rounded-full bg-[#E7F5F2] px-2.5 py-1 text-xs font-medium text-[#0F766E]">
                              AI Prediction
                            </span>

                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <span>
                              {formatDate(
                                prediction.created_at
                              )}
                            </span>

                            <span>•</span>

                            <span>
                              {formatTime(
                                prediction.created_at
                              )}
                            </span>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">

                            {symptoms
                              .slice(0, 5)
                              .map((symptom) => (
                                <span
                                  key={symptom}
                                  className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-500"
                                >
                                  {formatSymptom(
                                    symptom
                                  )}
                                </span>
                              ))}

                            {symptoms.length > 5 && (
                              <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-slate-400">
                                +{symptoms.length - 5} more
                              </span>
                            )}

                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-6 border-t border-slate-100 pt-4 md:min-w-[190px] md:flex-col md:items-end md:border-t-0 md:pt-0">

                          <div className="md:text-right">

                            <p className="text-xs text-slate-400">
                              Confidence
                            </p>

                            <p className="mt-1 text-xl font-semibold text-[#0F766E]">
                              {formatConfidence(
                                prediction.confidence
                              )}
                            </p>

                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              openPrediction(
                                prediction.id
                              )
                            }
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F766E] transition hover:text-[#115E59]"
                          >
                            View details

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
                                d="M5 12h14M13 6l6 6-6 6"
                              />
                            </svg>
                          </button>

                        </div>
                      </div>
                    </article>
                  );
                })}

              </div>
            </section>
          )}

        {/* Disclaimer */}

        {!loading && (
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

              <p className="text-xs leading-5 text-amber-800">
                MediPredict provides AI-assisted predictions
                for informational purposes only. Results
                should not be considered a medical diagnosis
                or a substitute for professional medical
                advice.
              </p>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}