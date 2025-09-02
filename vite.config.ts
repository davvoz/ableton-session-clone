import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Configure base path for GitHub Pages deployment
  base: process.env.GITHUB_PAGES ? '/ableton-session-clone/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Only enable lovable-tagger in local development (not in CI or production)
    mode === 'development' && !process.env.CI && !process.env.GITHUB_ACTIONS &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
