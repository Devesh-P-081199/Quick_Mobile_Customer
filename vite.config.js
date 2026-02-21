import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            ui: ["react-toastify", "react-loading-skeleton"],
            utils: ["axios", "lodash.debounce", "lodash.throttle"],
          },
        },
      },
    },
    server: {
      host: "0.0.0.0", // Allow external connections from any IP
      port: 3000, // Set your preferred port
      strictPort: true, // Fail if port is already in use
      proxy: {
        "/api": {
          target: env.BACKEND_URL || "http://localhost:8080",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
