import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    include: ["lucide-react"], // ⬅ JANGAN exclude
  },

  server: {
    host: true,

    allowedHosts: ["ungravelled-lue-uncatenated.ngrok-free.dev"],

    hmr: {
      protocol: "ws",
    },

    headers: {
      "Cache-Control": "no-store",
    },
  },
});
