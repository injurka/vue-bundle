import * as path from 'node:path'
import { URL, fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { type UserConfig, defineConfig } from 'vite'

import { visualizer } from 'rollup-plugin-visualizer'
import dts from 'vite-plugin-dts'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig(async ({ command }): Promise<UserConfig> => ({
  base: './',
  plugins: [
    vue(),
    vuetify(),
    vueJsx({ optimize: true, enableObjectSlots: true }),
    dts({ insertTypesEntry: true, tsconfigPath: 'tsconfig.app.json' }),
    visualizer(),
  ],
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  build: {
    minify: false,
    cssCodeSplit: true,
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    lib: {
      entry: 'src/index.ts',
      name: 'uikit',
      fileName: 'main',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.ts'),
      },
      external: ['vue', 'vuetify/components'],
      output: {
        exports: 'named',
      },
    },
  },
  esbuild: {
    drop: command === 'serve' ? [] : ['console'],
  },
}))
