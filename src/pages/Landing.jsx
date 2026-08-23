import { Link } from "react-router-dom";

function Landing() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8 lg:py-28">
          {/* Hero Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#5EEAD4]/20 px-3 py-1.5 text-sm font-medium text-[#0F766E]">
              <span className="h-2 w-2 rounded-full bg-[#0F766E]" />
              AI-powered health insights
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#16302B] sm:text-5xl lg:text-6xl">
              Understand your symptoms with{" "}
              <span className="text-[#0F766E]">AI assistance.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Enter the symptoms you're experiencing and get an AI-assisted
              prediction to help you understand possible health conditions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/predict"
                className="inline-flex items-center justify-center rounded-xl bg-[#0F766E] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#115E59]"
              >
                Start Prediction
                <span className="ml-2">→</span>
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#16302B] transition hover:border-[#5EEAD4] hover:bg-[#F6FAF9]"
              >
                Create Account
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <span className="text-[#22C55E]">✓</span>
                Simple to use
              </span>

              <span className="flex items-center gap-2">
                <span className="text-[#22C55E]">✓</span>
                Fast results
              </span>

              <span className="flex items-center gap-2">
                <span className="text-[#22C55E]">✓</span>
                Easy to understand
              </span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#5EEAD4]/20 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#0F766E]/10 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-semibold text-[#16302B]">
                    Symptom Check
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Select your symptoms
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5EEAD4]/20 text-[#0F766E]">
                  +
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {["Headache", "Fatigue", "Fever"].map((symptom) => (
                  <div
                    key={symptom}
                    className="flex items-center justify-between rounded-xl border border-[#5EEAD4]/40 bg-[#F6FAF9] px-4 py-3"
                  >
                    <span className="text-sm font-medium text-[#16302B]">
                      {symptom}
                    </span>

                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F766E] text-xs text-white">
                      ✓
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-[#0F766E] p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#CCFBF1]">
                      Prediction status
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Ready for analysis
                    </p>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0F766E]">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#16302B]">
              Simple from start to finish.
            </h2>

            <p className="mt-4 text-slate-600">
              Get an AI-assisted prediction in just a few straightforward
              steps.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Select symptoms",
                description:
                  "Choose the symptoms you are currently experiencing.",
              },
              {
                number: "02",
                title: "Run prediction",
                description:
                  "Our prediction system analyzes your selected symptoms.",
              },
              {
                number: "03",
                title: "View results",
                description:
                  "Review the predicted condition and useful information.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-[#F6FAF9] p-6"
              >
                <span className="text-sm font-bold text-[#0F766E]">
                  {step.number}
                </span>

                <h3 className="mt-4 text-lg font-semibold text-[#16302B]">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
<section className="bg-[#F6FAF9]">
  <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
    <div className="overflow-hidden rounded-3xl bg-[#0F766E] px-6 py-12 text-center sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#99F6E4]">
        Get started
      </p>

      <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Take the first step toward understanding your symptoms.
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#CCFBF1] sm:text-base">
        Select your symptoms and get an AI-assisted prediction in just a few
        simple steps.
      </p>

      <Link
        to="/predict"
        className="mt-8 inline-flex items-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0F766E] transition hover:bg-[#F0FDFA]"
      >
        Start a Prediction
        <span className="ml-2">→</span>
      </Link>
    </div>
  </div>
</section>
    </main>
  );
}

export default Landing;