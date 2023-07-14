import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pages from "vite-plugin-pages";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    pages({
      dirs: "src/pages",
      extensions: ["vue"],
    }),
  ],
  server: {
    port: 4000,
  },
  esbuild: {
    // drop: ["console", "debugger"],
  },
  build: {
    target: "es2015",
    assetsInlineLimit: 8192,
    sourcemap: isProd,
    minify: isProd ? "esbuild" : false,
  },
});
