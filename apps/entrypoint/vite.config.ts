import { URL, fileURLToPath } from 'node:url'

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig(async ({ command }): Promise<UserConfig> => ({
  plugins: [
    vue(),
    vuetify(),
    visualizer(),
  ],
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  esbuild: {
    drop: command === 'serve' ? [] : ['console'],
  },
}))
