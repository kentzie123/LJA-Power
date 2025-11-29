import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), imagetools()],

  server: {
    port: 80,
  },

  // 👇 ADD THIS SECTION TO FIX WARNINGS
  build: {
    // 1. Silence the warning (Set limit to 1.5MB so it stops yelling about 1MB files)
    chunkSizeWarningLimit: 1500,

    // 2. Split the code (Performance)
    // This separates your code from the libraries (React, GSAP, etc.)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
