import { Footer } from "@/components/Footer";
import { LandingHeading } from "@/components/LandingHeading";
import { PromptOptimizer } from "@/components/PromptOptimizer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1">
        <LandingHeading />
        <PromptOptimizer />
      </div>
      <Footer />
    </main>
  );
}
