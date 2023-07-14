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
    drop: ["console", "debugger"],
  },
  build: {
    target: "es2015",
    assetsInlineLimit: 8192,
    sourcemap: isProd,
    minify: isProd ? "esbuild" : false,
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/entry-[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name].[hash].[ext]",
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
