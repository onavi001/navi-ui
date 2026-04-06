import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navi: {
          primary: "rgb(var(--navi-color-primary) / <alpha-value>)",
          "primary-light":
            "rgb(var(--navi-color-primary-light) / <alpha-value>)",
          "primary-dark": "rgb(var(--navi-color-primary-dark) / <alpha-value>)",
          neutral: "rgb(var(--navi-color-neutral) / <alpha-value>)",
          "neutral-light":
            "rgb(var(--navi-color-neutral-light) / <alpha-value>)",
          "neutral-dark": "rgb(var(--navi-color-neutral-dark) / <alpha-value>)",
          success: "rgb(var(--navi-color-success) / <alpha-value>)",
          "success-light":
            "rgb(var(--navi-color-success-light) / <alpha-value>)",
          warning: "rgb(var(--navi-color-warning) / <alpha-value>)",
          "warning-light":
            "rgb(var(--navi-color-warning-light) / <alpha-value>)",
          destructive: "rgb(var(--navi-color-destructive) / <alpha-value>)",
          "destructive-dark":
            "rgb(var(--navi-color-destructive-dark) / <alpha-value>)",
          "destructive-light":
            "rgb(var(--navi-color-destructive-light) / <alpha-value>)",
          info: "rgb(var(--navi-color-info) / <alpha-value>)",
          "info-light": "rgb(var(--navi-color-info-light) / <alpha-value>)",
          surface: "rgb(var(--navi-color-surface) / <alpha-value>)",
          "surface-hover":
            "rgb(var(--navi-color-surface-hover) / <alpha-value>)",
          "surface-active":
            "rgb(var(--navi-color-surface-active) / <alpha-value>)",
          overlay: "rgb(var(--navi-color-overlay) / <alpha-value>)",
          "overlay-light":
            "rgb(var(--navi-color-overlay-light) / <alpha-value>)",
          ink: "rgb(var(--navi-color-ink) / <alpha-value>)",
          border: "rgb(var(--navi-color-border) / <alpha-value>)",
          "border-dark": "rgb(var(--navi-color-border-dark) / <alpha-value>)",
          inverse: "rgb(var(--navi-color-inverse) / <alpha-value>)",
        },
      },
      borderRadius: {
        "navi-sm": "var(--navi-radius-sm)",
        "navi-md": "var(--navi-radius-md)",
        "navi-lg": "var(--navi-radius-lg)",
      },
      boxShadow: {
        "navi-sm": "var(--navi-shadow-sm)",
        "navi-md": "var(--navi-shadow-md)",
        "navi-lg": "var(--navi-shadow-lg)",
        "navi-xl": "var(--navi-shadow-xl)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchVariant }) {
      // Add data-state variants
      matchVariant("data-state", (value) => `&[data-state="${value}"]`, {
        values: {
          checked: "checked",
          unchecked: "unchecked",
          indeterminate: "indeterminate",
          open: "open",
          closed: "closed",
        },
      });

      // Add group-data-state variants
      matchVariant(
        "group-data-state",
        (value) => `:where(.group)[data-state="${value}"] &`,
        {
          values: {
            checked: "checked",
            unchecked: "unchecked",
            indeterminate: "indeterminate",
          },
        },
      );
    }),
  ],
} satisfies Config;
