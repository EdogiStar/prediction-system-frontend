import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const { user, token } = useAuth();

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch recent predictions
  // ==========================================

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/predictions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPredictions(response.data.data || []);
      } catch (error) {
        console.error(
          "Failed to load predictions:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPredictions();
    } else {
      setLoading(false);
    }
  }, [token]);

  const recentPredictions = predictions.slice(0, 3);

  // ==========================================
  // Format date
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <main className="min-h-screen bg-[#F6FAF9]">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 lg:py-14">

        {/* =====================================
            Welcome
        ====================================== */}

        <section className="mb-10">

          <p className="text-sm font-medium text-[#0F766E] mb-2">
            Dashboard
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
            Welcome back, {user?.name?.split(" ")[0] || "there"} 👋
          </h1>

          <p className="mt-3 text-slate-500 max-w-xl leading-6">
            Here's a quick overview of your health activity.
          </p>

        </section>


        {/* =====================================
            Main Actions
        ====================================== */}

        <section className="grid md:grid-cols-2 gap-5 mb-12">

          {/* Prediction Card */}

          <div className="relative overflow-hidden rounded-3xl bg-[#0F766E] text-white p-7 sm:p-8">

            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10" />

            <div className="relative z-10">

              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-7">

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

              <h2 className="text-2xl font-semibold">
                Check your symptoms
              </h2>

              <p className="mt-3 text-white/75 leading-6 max-w-md">
                Get a disease prediction based on the symptoms
                you're experiencing.
              </p>

              <Link
                to="/predict"
                className="inline-flex items-center gap-2 mt-7 px-5 py-3 rounded-xl bg-white text-[#0F766E] font-medium hover:bg-white/90 transition"
              >
                Start Prediction

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

              </Link>

            </div>

          </div>


          {/* History Card */}

          <div className="rounded-3xl bg-white border border-slate-100 p-7 sm:p-8 shadow-sm">

            <div className="w-12 h-12 rounded-2xl bg-[#E7F5F2] text-[#0F766E] flex items-center justify-center mb-7">

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
                  d="M3 12a9 9 0 1 0 3-6.7"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4v5h5"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7v5l3 2"
                />
              </svg>

            </div>

            <h2 className="text-2xl font-semibold text-slate-900">
              Prediction history
            </h2>

            <p className="mt-3 text-slate-500 leading-6 max-w-md">
              Review your previous predictions and keep track
              of your activity.
            </p>

            <Link
              to="/history"
              className="inline-flex items-center gap-2 mt-7 px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:border-[#0F766E] hover:text-[#0F766E] transition"
            >
              View History

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

            </Link>

          </div>

        </section>


        {/* =====================================
            Recent Predictions
        ====================================== */}

        <section>

          <div className="flex items-end justify-between mb-5">

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                Recent predictions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest prediction activity.
              </p>
            </div>

            {predictions.length > 0 && (
              <Link
                to="/history"
                className="hidden sm:inline-flex text-sm font-medium text-[#0F766E] hover:text-[#115E59]"
              >
                View all
              </Link>
            )}

          </div>


          {/* Loading */}

          {loading && (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 flex justify-center">

              <div className="w-7 h-7 border-3 border-[#0F766E]/20 border-t-[#0F766E] rounded-full animate-spin" />

            </div>
          )}


          {/* Empty */}

          {!loading && recentPredictions.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 sm:p-10 text-center">

              <div className="mx-auto w-12 h-12 rounded-2xl bg-[#E7F5F2] text-[#0F766E] flex items-center justify-center">

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
                    d="M9 12h6M9 16h4"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 3v5h5"
                  />
                </svg>

              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No predictions yet
              </h3>

              <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                Your completed predictions will appear here.
              </p>

              <Link
                to="/predict"
                className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-[#0F766E]"
              >
                Make your first prediction
                <span>→</span>
              </Link>

            </div>
          )}


          {/* Predictions */}

          {!loading && recentPredictions.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">

              <div className="divide-y divide-slate-100">

                {recentPredictions.map((prediction) => (
                  <Link
                    key={prediction.id}
                    to={`/history/${prediction.id}`}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:px-6 hover:bg-slate-50 transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 shrink-0 rounded-xl bg-[#E7F5F2] text-[#0F766E] flex items-center justify-center">

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

                      <div>

                        <p className="font-medium text-slate-900">
                          {prediction.predicted_disease}
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          {formatDate(prediction.created_at)}
                        </p>

                      </div>

                    </div>


                    <div className="flex items-center justify-between sm:justify-end gap-5">

                      <div className="text-left sm:text-right">

                        <p className="text-xs text-slate-400 uppercase tracking-wide">
                          Confidence
                        </p>

                        <p className="mt-1 font-semibold text-[#0F766E]">
                          {prediction.confidence}%
                        </p>

                      </div>

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="w-5 h-5 text-slate-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9 18 6-6-6-6"
                        />
                      </svg>

                    </div>

                  </Link>
                ))}

              </div>

            </div>
          )}

        </section>

      </div>

    </main>
  );
}