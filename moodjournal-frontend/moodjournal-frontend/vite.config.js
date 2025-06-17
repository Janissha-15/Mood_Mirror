import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "3d7fc4b9-37a2-4d9f-8bca-1316f7015797-00-bjse6of68yxk.sisko.replit.dev",
    ],
  },
});
