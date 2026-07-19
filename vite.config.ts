import { URL, fileURLToPath } from "url";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({ reactivityTransform: true }),
    Components({ dirs: ["src/components"] }),
    AutoImport({ imports: ["vue"] }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
  base: "/",
});
