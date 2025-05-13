import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import VueSetupExtend from "unplugin-vue-setup-extend-plus/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_APP_BASE || "/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      VueSetupExtend(),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        dts: "src/auto-imports.d.ts",
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        dts: "src/components.d.ts",
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      viteCompression({
        algorithm: "gzip",
        threshold: 10240,
        ext: ".gz"
      }),
      visualizer({
        open: false,
        filename: "dist/report.html",
        gzipSize: true,
        brotliSize: true
      }),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg", "robots.txt"],
        manifest: {
          name: "Tingbao Admin",
          short_name: "Admin",
          description: "管理后台系统",
          theme_color: "#ffffff",
          icons: [
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png"
            }
          ]
        }
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    server: {
      port: 5173,
      open: true,
      proxy: {
        [env.VITE_API_PREFIX]: {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_API_PREFIX}`), "")
        }
      }
    },
    build: {
      outDir: "dist",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("element-plus")) return "elementPlus";
              if (id.includes("echarts")) return "echarts";
              return "vendor";
            }
          }
        }
      }
    }
  };
});
