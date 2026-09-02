import type { Config } from "tailwindcss";
import tokens from "./tailwind.tokens.json";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./mvp-assets/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      height: tokens.height,
      fontSize: tokens.fontSize
    }
  }
};

export default config;
