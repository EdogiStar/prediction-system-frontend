import { Link } from "react-router-dom";

function PredictionResult({
  predictionResult,
  formatDisease,
  formatConfidence,
}) {
  if (!predictionResult) {
    return null;
  }

  const disease =
    predictionResult?.mlResult?.predicted_disease ||
    predictionResult?.prediction?.predicted_disease;

  const confidence =
    predictionResult?.mlResult?.confidence ??
    predictionResult?.prediction?.confidence;

  const predictionId =
    predictionResult?.prediction?.id;

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-[#BFE3DD] bg-white shadow-sm">
      <div className="bg-[#E7F5F2] px-5 py-6 sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
          Prediction result
        </p>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#16302B] sm:text-3xl">
              {formatDisease(disease)}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Based on the symptoms you selected.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-3 text-center shadow-sm">
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Confidence
            </p>

            <p className="mt-1 text-xl font-bold text-[#0F766E]">
              {formatConfidence(confidence)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <p className="text-sm font-medium text-slate-700">
            Prediction completed
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            This result is AI-assisted and should not
            be treated as a medical diagnosis.
          </p>
        </div>

        {predictionId && (
          <Link
            to={`/history/${predictionId}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0F766E] px-4 py-2.5 text-sm font-semibold text-[#0F766E] transition hover:bg-[#E7F5F2]"
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
          </Link>
        )}
      </div>
    </section>
  );
}

export default PredictionResult;