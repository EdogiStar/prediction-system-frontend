import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import SymptomSelector from "../components/prediction/SymptomSelector";
import PredictionResult from "../components/prediction/PredictionResult";

function Prediction() {
  const { user } = useAuth();

  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingSymptoms, setLoadingSymptoms] = useState(true);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);

  // ==========================================
  // Fetch available symptoms
  // Automatically retry while ML service wakes up
  // ==========================================

  useEffect(() => {
    let cancelled = false;

    const wait = (milliseconds) =>
      new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
      });

    const fetchSymptoms = async () => {
      const maxAttempts = 3;

      try {
        setLoadingSymptoms(true);
        setError("");

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          try {
            const response = await api.get("/predictions/symptoms", {
              timeout: 60000,
            });

            if (cancelled) return;

            const data = response.data;

            const availableSymptoms = Array.isArray(data)
              ? data
              : Array.isArray(data?.symptoms)
              ? data.symptoms
              : [];

            setSymptoms(availableSymptoms);

            return;
          } catch (err) {
            console.error(
              `Failed to load symptoms (attempt ${attempt}/${maxAttempts}):`,
              err
            );

            if (attempt === maxAttempts) {
              throw err;
            }

            // Give the ML service time to finish waking up.
            await wait(5000);

            if (cancelled) return;
          }
        }
      } catch (err) {
        if (cancelled) return;

        setError(
          err.response?.data?.message ||
            "The prediction service is waking up. Please try again in a moment."
        );
      } finally {
        if (!cancelled) {
          setLoadingSymptoms(false);
        }
      }
    };

    fetchSymptoms();

    return () => {
      cancelled = true;
    };
  }, []);

  // ==========================================
  // Filter symptoms
  // ==========================================

  const filteredSymptoms = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return symptoms;
    }

    return symptoms.filter((symptom) =>
      symptom.replace(/_/g, " ").toLowerCase().includes(query)
    );
  }, [symptoms, search]);

  // ==========================================
  // Format symptom
  // ==========================================

  const formatSymptom = (symptom) => {
    return symptom
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  // ==========================================
  // Toggle symptom
  // ==========================================

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((current) => {
      if (current.includes(symptom)) {
        return current.filter((item) => item !== symptom);
      }

      return [...current, symptom];
    });

    setPredictionResult(null);
    setError("");
  };

  // ==========================================
  // Remove selected symptom
  // ==========================================

  const removeSymptom = (symptom) => {
    setSelectedSymptoms((current) =>
      current.filter((item) => item !== symptom)
    );

    setPredictionResult(null);
    setError("");
  };

  // ==========================================
  // Clear symptoms
  // ==========================================

  const clearSymptoms = () => {
    setSelectedSymptoms([]);
    setPredictionResult(null);
    setError("");
  };

  // ==========================================
  // Submit prediction
  // ==========================================

  const handlePredict = async () => {
    if (selectedSymptoms.length < 3) {
      setError(
        `Please select at least 3 symptoms. You currently have ${selectedSymptoms.length}.`
      );

      return;
    }

    try {
      setPredicting(true);
      setError("");
      setPredictionResult(null);

      const response = await api.post("/predictions", {
        symptoms: selectedSymptoms,
      });

      const result = response.data?.data;

      setPredictionResult(result || null);
    } catch (err) {
      console.error("Prediction request failed:", err);

      if (err.response?.status === 401) {
        setError("Your session has expired. Please sign in again.");
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to generate a prediction. Please try again."
        );
      }
    } finally {
      setPredicting(false);
    }
  };

  // ==========================================
  // Format prediction result
  // ==========================================

  const formatDisease = (disease) => {
    if (!disease) {
      return "Unknown";
    }

    return disease
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const formatConfidence = (confidence) => {
    if (confidence === null || confidence === undefined) {
      return "—";
    }

    const value = Number(confidence);

    if (Number.isNaN(value)) {
      return "—";
    }

    const percentage = value <= 1 ? value * 100 : value;

    return `${percentage.toFixed(1)}%`;
  };

  return (
    <main className="min-h-screen bg-[#F6FAF9]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Page Header */}

        <section className="mb-8">
          <p className="mb-2 text-sm font-medium text-[#0F766E]">
            AI Health Prediction
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Check your symptoms
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Select the symptoms you're experiencing and let MediPredict
                provide an AI-assisted prediction.
              </p>
            </div>

            {user && (
              <div className="hidden rounded-xl bg-white px-4 py-3 shadow-sm sm:block">
                <p className="text-xs text-slate-400">
                  Signed in as
                </p>

                <p className="mt-0.5 text-sm font-medium text-slate-700">
                  {user.name}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3.5">
            <div className="flex gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
              >
                <circle cx="12" cy="12" r="9" />

                <path strokeLinecap="round" d="M12 8v4" />

                <path strokeLinecap="round" d="M12 16h.01" />
              </svg>

              <p className="text-sm leading-5 text-red-700">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Main Prediction Area */}

        <section className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
          <SymptomSelector
            filteredSymptoms={filteredSymptoms}
            selectedSymptoms={selectedSymptoms}
            search={search}
            setSearch={setSearch}
            loadingSymptoms={loadingSymptoms}
            toggleSymptom={toggleSymptom}
            formatSymptom={formatSymptom}
          />

          {/* Selected Symptoms */}

          <aside className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7 md:sticky md:top-24 md:h-fit">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Your symptoms
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedSymptoms.length > 0
                    ? `${selectedSymptoms.length} symptom${
                        selectedSymptoms.length === 1 ? "" : "s"
                      } selected`
                    : "Nothing selected yet"}
                </p>
              </div>

              {selectedSymptoms.length > 0 && (
                <button
                  type="button"
                  onClick={clearSymptoms}
                  className="text-xs font-medium text-slate-400 transition hover:text-red-500"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mt-5 min-h-[170px]">
              {selectedSymptoms.length === 0 ? (
                <div className="flex min-h-[170px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-300 shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6M12 9v6"
                      />

                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-600">
                    Select your symptoms
                  </p>

                  <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
                    Your selected symptoms will appear here.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => removeSymptom(symptom)}
                      className="group inline-flex items-center gap-2 rounded-xl bg-[#E7F5F2] px-3 py-2 text-xs font-medium text-[#0F766E] transition hover:bg-[#D5EFEB]"
                    >
                      <span>{formatSymptom(symptom)}</span>

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          d="M6 6l12 12M18 6 6 18"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Predict Button */}

            <button
              type="button"
              onClick={handlePredict}
              disabled={
                predicting ||
                loadingSymptoms ||
                selectedSymptoms.length < 3
              }
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 text-sm font-semibold text-white transition hover:bg-[#115E59] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {predicting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Analyzing symptoms...
                </>
              ) : (
                <>
                  Get prediction

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
                </>
              )}
            </button>

            {selectedSymptoms.length > 0 &&
              selectedSymptoms.length < 3 && (
                <p className="mt-3 text-center text-xs text-amber-600">
                  Select at least 3 symptoms to continue.
                </p>
              )}

            {!user && (
              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                You can check your symptoms as a guest.

                <Link
                  to="/login"
                  className="ml-1 font-medium text-[#0F766E] hover:text-[#115E59]"
                >
                  Sign in
                </Link>{" "}
                to save your prediction history.
              </p>
            )}
          </aside>
        </section>

        {/* Prediction Result */}

        <PredictionResult
          predictionResult={predictionResult}
          formatDisease={formatDisease}
          formatConfidence={formatConfidence}
        />

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

              <path strokeLinecap="round" d="M12 8v4" />

              <path strokeLinecap="round" d="M12 16h.01" />
            </svg>

            <p className="text-xs leading-5 text-amber-800">
              MediPredict provides AI-assisted predictions for informational
              purposes only. Results should not be considered a medical
              diagnosis or a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Prediction;