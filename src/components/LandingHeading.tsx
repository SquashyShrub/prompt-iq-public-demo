export function LandingHeading() {
  return (
    <section
      className="flex flex-col items-center px-6 pt-10 pb-4 sm:px-8 sm:pt-14 sm:pb-6"
      aria-labelledby="landing-heading"
    >
      <header className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 text-center">
        <h1
          id="landing-heading"
          className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-[2.75rem] md:leading-tight"
        >
          Turn weak prompts into powerful AI instructions.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          PromptIQ helps you improve your prompts while teaching you why
          better structure creates better AI results.
        </p>
      </header>
    </section>
  );
}
