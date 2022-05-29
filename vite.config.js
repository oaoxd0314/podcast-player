import { fileURLToPath, URL } from 'url'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})