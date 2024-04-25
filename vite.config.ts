import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vant from 'vant'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
    // 使用 vant 插件
    // vant()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
