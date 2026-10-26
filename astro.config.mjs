// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://meepilates.com.br",
  vite: {
    plugins: [tailwindcss()],
  },
});
