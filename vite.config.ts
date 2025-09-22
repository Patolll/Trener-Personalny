import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        page2: resolve(__dirname, "page2.html"),
        polityka: resolve(__dirname, "polityka-prywatnosci.html"),
      },
    },
  },
});
