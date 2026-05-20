export function LandingHeading() {
  return (
    <section
      className="flex flex-col items-center px-6 pt-16 pb-8 sm:px-8 sm:pt-20 sm:pb-10"
      aria-labelledby="landing-heading"
    >
      <header className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
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
    </section>
  );
}
