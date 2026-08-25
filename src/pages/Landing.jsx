import { useEffect } from "react";
import { Link } from "react-router-dom";

import doctorHero from "../assets/doctor-hero.jpeg";
import api from "../services/api";

function Landing() {
  // ==========================================
  // Wake up ML service in the background
  // ==========================================

  useEffect(() => {
    const warmUpMLService = async () => {
      try {
        await api.get("/predictions/symptoms", {
          timeout: 60000,
        });

        console.log("ML prediction service is awake");
      } catch (error) {
        // Silent failure.
        // This request is only meant to wake up the ML service.
        // The user should not see an error on the landing page.
        console.log("ML service warm-up request failed");
      }
    };

    warmUpMLService();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="overflow-hidden bg-[#F6FAF9]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 sm:px-6 md:grid-cols-2 md:gap-12 md:py-16 lg:gap-16 lg:px-8 lg:py-20">
          {/* Doctor Image */}
          <div className="order-1 md:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-xl">
              {/* Decorative shapes */}
              <div className="absolute -right-6 top-8 h-24 w-24 rounded-full bg-[#5EEAD4]/30 blur-2xl" />
              <div className="absolute -bottom-8 -left-6 h-28 w-28 rounded-full bg-[#0F766E]/10 blur-2xl" />

              {/* Image container */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl shadow-[#0F766E]/10">
                <img
                  src={doctorHero}
                  alt="Female doctor"
                  className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[560px]"
                />

                {/* Floating information card */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5EEAD4]/30 text-[#0F766E]">
                      ✓
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#16302B]">
                        AI-assisted analysis
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Fast and easy symptom assessment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="order-2 md:order-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5EEAD4]/40 bg-white px-3.5 py-2 text-sm font-medium text-[#0F766E] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#0F766E]" />
              AI-powered health insights
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-[#16302B] sm:text-5xl lg:text-6xl">
              Understand your symptoms with{" "}
              <span className="text-[#0F766E]">AI assistance.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
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
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#16302B] transition hover:border-[#5EEAD4] hover:bg-white"
              >
                Create Account
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
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
              Select your symptoms and get an AI-assisted prediction in just a
              few simple steps.
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