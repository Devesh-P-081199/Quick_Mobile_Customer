import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow external connections from any IP
    port: 3000, // Set your preferred port
    strictPort: true, // Fail if port is already in use
  },
});
