import { ChevronLeft } from "lucide-react";

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
}

export function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-5 pb-2 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <button
        type="button"
        onClick={onBack}
        aria-label="Voltar"
        className="grid h-10 w-10 place-items-center rounded-full border"
        style={{ borderColor: "var(--line)", background: "var(--surface)" }}
      >
        <ChevronLeft size={20} color="var(--ink)" />
      </button>
      <h1 className="font-display text-lg font-medium" style={{ color: "var(--ink)" }}>
        {title}
      </h1>
    </div>
  );
}
