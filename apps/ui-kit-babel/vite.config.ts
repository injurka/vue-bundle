import { URL, fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { type UserConfig, defineConfig } from 'vite'

import { visualizer } from 'rollup-plugin-visualizer'
import dts from 'vite-plugin-dts'

export default defineConfig(async ({ command }): Promise<UserConfig> => ({
  base: './',
  plugins: [
    vue(),
    vueJsx({ optimize: true, enableObjectSlots: true }),
    dts({ insertTypesEntry: true, tsconfigPath: 'tsconfig.build.json' }),
    visualizer(),
  ],
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
      '@': fileURLToPath(new URL('./stories', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  build: {
    minify: false,
  },
  esbuild: {
    drop: command === 'serve' ? [] : ['console'],
  },
}))
