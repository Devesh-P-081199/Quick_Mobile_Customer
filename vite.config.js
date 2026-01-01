import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0", // Allow external connections from any IP
      port: 3000, // Set your preferred port
      strictPort: true, // Fail if port is already in use
      proxy: {
        "/api": {
          target: env.BACKEND_URL || "http://localhdfkost:8080",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
