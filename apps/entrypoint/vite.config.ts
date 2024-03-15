import { URL, fileURLToPath } from 'node:url'

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(async ({ command }): Promise<UserConfig> => ({
  plugins: [
    vue(),
    visualizer(),
  ],
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
      '@': fileURLToPath(new URL('./stories', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  esbuild: {
    drop: command === 'serve' ? [] : ['console'],
  },
}))
