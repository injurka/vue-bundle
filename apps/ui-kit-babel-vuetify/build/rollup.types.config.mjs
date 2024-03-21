import fs from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import dts from 'rollup-plugin-dts'
import alias from '@rollup/plugin-alias'
import fg from 'fast-glob'
import mm from 'micromatch'
import MagicString from 'magic-string'

// eslint-disable-next-line antfu/no-import-dist
import importMap from '../dist/json/importMap.json' assert { type: 'json' }

function externalsPlugin() {
  return {
    resolveId(source, importer) {
      if (importer && (source.endsWith('.sass') || source.endsWith('.scss'))) {
        return {
          id: source,
          external: true,
          moduleSideEffects: false,
        }
      }
    },
  }
}

function createTypesConfig(input, output, renderChunk, filter) {
  input = `types-temp/${input}`
  let files = fg.sync(input)

  if (filter)
    files = filter(files)

  return files.map((file) => {
    const outputFile = output.replace('*', mm.capture(input, file)[0])
    return {
      input: file,
      output: [{ file: outputFile, format: 'es', sourcemap: false }],
      plugins: [
        dts(),
        externalsPlugin(),
        alias({
          entries: [
            { find: /^#\/(.*)/, replacement: fileURLToPath(new URL('../types-temp/$1', import.meta.url)) },
          ],
        }),
        {
          async renderChunk(code) {
            code = new MagicString(code)

            if (renderChunk)
              await renderChunk(code)
            code.replaceAll(/import([^;])*?from 'vue-router'/gm, '// @ts-ignore\n$&')

            const map = code.generateMap({
              includeContent: false,
            })

            return {
              code: code.toString(),
              map,
            }
          },
        },
      ],
    }
  })
}

async function getShims() {
  const components = Object.keys(importMap.components).map(name => (
    `    ${name}: typeof import('uikit/components')['${name}']`
  ))

  return (await fs.readFile(fileURLToPath(new URL('../src/shims.d.ts', import.meta.url)), { encoding: 'utf8' }))
    .replaceAll(/^\s*\/\/ @skip-build\s+.*$/gm, '')
    .replace(/^\s*\/\/ @generate-components$/gm, components)
}

export default [
  createTypesConfig('plugin.d.ts', 'lib/plugin.d.mts', async (code) => {
    code.append('\n\n')
    code.append(await getShims())
  }),
  createTypesConfig('index.d.ts', 'dist/index.d.ts', async (code) => {
    code.replaceAll(/type index_d\$1_V(\w+) = V(\w+);/gm, 'declare const index_d$$1_V$1: typeof V$2;')
    code.append('\n\n')
    code.append((await getShims()).replace(', VNodeChild } from \'vue\'', ' } from \'vue\''))
  }),
  createTypesConfig('components/index.d.ts', 'lib/components/index.d.mts'),
  createTypesConfig('components/*/index.d.ts', 'lib/components/*/index.d.mts', undefined, (files) => {
    const index = readFileSync(fileURLToPath(new URL('../src/components/index.ts', import.meta.url)), { encoding: 'utf8' })
    const block = Array.from(index.matchAll(/^\/\/ export \* from '\.\/(.*)'$/gm), m => m[1])
    return files.filter(file => !block.some(name => file.includes(`/${name}/`)))
  }),
].flat()
