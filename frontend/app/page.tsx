import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo";
import { CinematicFooter } from "@/components/ui/cinematic-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <HeroScrollDemo />
      <CinematicFooter />
    </main>
  );
}
