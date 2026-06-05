import { PolskiWorld } from "@/components/PolskiWorld";

/**
 * Thin server entry for the App Router. All interactivity lives in the
 * `PolskiWorld` client shell so this page renders instantly and stays simple.
 */
export default function Home() {
  return <PolskiWorld />;
}
