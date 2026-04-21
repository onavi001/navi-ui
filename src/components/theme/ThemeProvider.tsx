import * as React from "react";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

function resolveSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ThemeMode): void {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  const resolved = theme === "system" ? resolveSystemTheme() : theme;
  html.classList.remove("light", "dark");
  html.classList.add(resolved);
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "navi-ui-theme",
}: ThemeProviderProps) {
  const [theme] = React.useState<ThemeMode>(() => {
    if (typeof window === "undefined") return defaultTheme;
    const saved = localStorage.getItem(storageKey) as ThemeMode | null;
    return saved ?? defaultTheme;
  });

  React.useEffect(() => {
    applyTheme(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, theme);
    }
  }, [theme, storageKey]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") applyTheme("system");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);

  return <>{children}</>;
}

ThemeProvider.displayName = "ThemeProvider";
