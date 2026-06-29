/* eslint-disable react-refresh/only-export-components */

/* 
 If using Next.js, I would recommend using the built-in 
 next-themes package instead of this custom implementation. 
 However, this implementation is still valid and can be used in any React project.
 */

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type ThemeMode = Theme | "system";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

const STORAGE_KEY = "theme";

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const getSystemTheme = (): Theme =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [mode, setMode] = useState<ThemeMode>(() => {
    return (
      (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? defaultTheme
    );
  });

  const [theme, setResolvedTheme] = useState<Theme>(() =>
    mode === "system" ? getSystemTheme() : mode,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      const resolved = mode === "system" ? getSystemTheme() : mode;

      setResolvedTheme(resolved);

      document.documentElement.classList.toggle("dark", resolved === "dark");
    };

    updateTheme();

    if (mode === "system") {
      media.addEventListener("change", updateTheme);
      return () => media.removeEventListener("change", updateTheme);
    }
  }, [mode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      theme,
      mode,
      setTheme: setMode,
      toggleTheme: () =>
        setMode((prev) =>
          (prev === "system" ? theme : prev) === "dark" ? "light" : "dark",
        ),
    }),
    [theme, mode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
