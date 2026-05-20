export function LandingHeading() {
  return (
    <section
      className="flex min-h-screen flex-col items-center justify-center px-6 py-16 sm:px-8"
      aria-labelledby="landing-heading"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <header className="flex flex-col gap-4">
          <h1
            id="landing-heading"
            className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl"
          >
            Turn weak prompts into powerful AI instructions.
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
            PromptIQ helps you improve your prompts while teaching you why
            better structure creates better AI results.
          </p>
        </header>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <button
            type="button"
            className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            Start Optimizing
          </button>
          <button
            type="button"
            className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            Learn the Method
          </button>
        </div>
      </div>
    </section>
  );
}
