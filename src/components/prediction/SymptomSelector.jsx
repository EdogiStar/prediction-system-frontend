function SymptomSelector({
  filteredSymptoms,
  selectedSymptoms,
  search,
  setSearch,
  loadingSymptoms,
  toggleSymptom,
  formatSymptom,
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Select symptoms
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose all symptoms that apply.
          </p>
        </div>

        <span className="w-fit rounded-full bg-[#E7F5F2] px-3 py-1 text-xs font-semibold text-[#0F766E]">
          {selectedSymptoms.length} selected
        </span>
      </div>

      {/* Search */}

      <div className="relative mt-6">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400"
        >
          <circle cx="11" cy="11" r="6.5" />

          <path
            strokeLinecap="round"
            d="m16 16 4 4"
          />
        </svg>

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search symptoms..."
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/10"
        />
      </div>

      {/* Symptoms */}

      <div className="mt-5">
        {loadingSymptoms ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0F766E]/20 border-t-[#0F766E]" />

            <p className="mt-3 text-sm text-slate-500">
              Loading symptoms...
            </p>
          </div>
        ) : filteredSymptoms.length === 0 ? (
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl bg-slate-50 px-5 text-center">
            <div>
              <p className="text-sm font-medium text-slate-700">
                No symptoms found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try a different search term.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid max-h-[430px] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
            {filteredSymptoms.map((symptom) => {
              const selected =
                selectedSymptoms.includes(symptom);

              return (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition ${
                    selected
                      ? "border-[#0F766E] bg-[#E7F5F2] text-[#0F766E]"
                      : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-white"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                      selected
                        ? "border-[#0F766E] bg-[#0F766E] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {selected && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5 12 4 4L19 6"
                        />
                      </svg>
                    )}
                  </span>

                  <span className="leading-5">
                    {formatSymptom(symptom)}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SymptomSelector;