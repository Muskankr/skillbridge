"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] =
    useState<Theme>("dark");

  function applyTheme(mode: Theme) {
    let finalTheme = mode;

    if (mode === "system") {
      finalTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? "dark"
        : "light";
    }

    document.documentElement.setAttribute(
      "data-theme",
      finalTheme
    );

    localStorage.setItem("theme", mode);

    setThemeState(mode);
  }

  useEffect(() => {
    const saved =
      (localStorage.getItem("theme") as Theme) ||
      "dark";

    applyTheme(saved);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: applyTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () =>
  useContext(ThemeContext);


