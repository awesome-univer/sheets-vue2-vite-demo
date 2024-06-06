import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue2'
import { univerPlugin } from '@univerjs/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [univerPlugin(), vue()],
  resolve: {
    alias: {
      'vue': path.resolve('./node_modules/vue/dist/vue.runtime.esm.js')
    }
  }
})
