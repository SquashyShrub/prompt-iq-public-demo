import { EmptyResultsArea } from "@/components/EmptyResultsArea";
import { LandingHeading } from "@/components/LandingHeading";
import { WeakPromptTextArea } from "@/components/WeakPromptTextArea";

export default function Home() {
  return (
    <main>
      <LandingHeading />
      <WeakPromptTextArea />
      <EmptyResultsArea />
    </main>
  );
}
