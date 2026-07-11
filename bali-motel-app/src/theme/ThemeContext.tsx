import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ThemeId } from "../types";

interface ThemeMeta {
  id: ThemeId;
  label: string;
}

export const THEMES: ThemeMeta[] = [
  { id: "tropical", label: "Tropical Refinado" },
  { id: "romance", label: "Romance Quente" },
  { id: "night", label: "Luxo Noturno" },
];

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "bali-motel-theme";

function readInitialTheme(): ThemeId {
  if (typeof window === "undefined") return "tropical";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "tropical" || saved === "romance" || saved === "night") {
    return saved;
  }
  return "tropical";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  return ctx;
}
