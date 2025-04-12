import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    includes: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
  define: {
    global: {},
  },
});
