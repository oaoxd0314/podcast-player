import { fileURLToPath, URL } from 'url'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  proxy: {
    '/soundon': {
         target: 'https://api.soundon.fm/v2/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml',
         changeOrigin: true,
         secure: false,      
         ws: true,
     }
  },
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