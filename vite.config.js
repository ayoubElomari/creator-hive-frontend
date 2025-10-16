import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// AUTO DETECT API BASE: Local proxy in dev, Render URL in prod
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://creator-hive-backend.onrender.com"
    : "";

export default defineConfig({
  define: {
    __API_URL__: JSON.stringify(API_BASE_URL),
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Local backend
        changeOrigin: true,
      },
    },
    // Allows ngrok PWA test through external URL
    allowedHosts: [
      "nonstandard-lenita-unpersuadably.ngrok-free.dev", // your ngrok url (keep this!)
      "localhost",
    ],
  },
});
