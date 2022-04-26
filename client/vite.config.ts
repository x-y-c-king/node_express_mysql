import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  optimizeDeps: {
    include: [
      "vuex",
      "vue",
      "vue-router",
      "axios"
    ]
  },
  server: {
    open: false, // 自动在浏览器打开
    cors: true,
    // port: 8081,
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "http://192.168.1.85:9090",
        changeOrigin: true,
        // rewrite: (path) => path.replace("^\/api", ""),
        rewrite: (path) => path.replace("^/api", "/")
      }
    }
  },
  resolve: {
    alias: [{
      find: "@",
      replacement: resolve(__dirname, 'src')
    }]
  },
  build: {
    // outDir: 'dist',
    // assetsDir: 'assets',
    // sourcemap: true, // 是否构建source map 文件
    // terserOptions: {
    //   compress: {
    //     drop_debugger: true,
    //     drop_console: true
    //   }
    // },
    // minify: "terser"
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/css/common.scss";'
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // OptimizationPersist(),
    // PkgConfig()
  ],
})
