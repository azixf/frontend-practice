import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pages from "vite-plugin-pages";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import legacy from '@vitejs/plugin-legacy'
import path from "path";

const isProd = process.env.NODE_ENV === "production";
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/style/theme/_themeify.scss" as *;`
      }
    }
  },
  plugins: [
    vue(),
    pages({
      dirs: "src/pages",
      extensions: ["vue"],
    }),
    createSvgIconsPlugin({
      iconDirs: [
        path.resolve(__dirname, 'src/assets/svg')
      ],
      symbolId: 'icon-[dir]-[name]'
    }),
    legacy()
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
  },
});
