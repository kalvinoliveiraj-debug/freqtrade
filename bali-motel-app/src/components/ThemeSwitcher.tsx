import { useState } from "react";
import { Palette } from "lucide-react";
import { THEMES, useTheme } from "../theme/ThemeContext";

const SWATCH: Record<string, string> = {
  tropical: "#0f2e2b",
  romance: "#b8451f",
  night: "#ff5a1f",
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Trocar tema"
        onClick={() => setOpen((v) => !v)}
        className="grid h-10 w-10 place-items-center rounded-full border"
        style={{ borderColor: "var(--line)", background: "var(--surface)" }}
      >
        <Palette size={18} color="var(--ink)" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 z-20 mt-2 w-52 rounded-2xl border p-2 shadow-xl"
            style={{ borderColor: "var(--line)", background: "var(--surface)" }}
          >
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm"
                style={{
                  background: theme === t.id ? "var(--surface-2)" : "transparent",
                  color: "var(--ink)",
                }}
              >
                <span
                  className="h-4 w-4 shrink-0 rounded-full border"
                  style={{ background: SWATCH[t.id], borderColor: "var(--line)" }}
                />
                {t.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
