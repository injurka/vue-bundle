import { posix as path } from 'node:path'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { mkdirp } from 'mkdirp'

import alias from '@rollup/plugin-alias'
import sass from 'rollup-plugin-sass'
import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'

import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcss from 'postcss'
import { simple as walk } from 'acorn-walk'

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs']

function fixWindowsPath(path) {
  return path.replace(/^[^:]+:\\/, '\\').replaceAll('\\', '/')
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/uikit.esm.js',
        format: 'es',
        sourcemap: true,
      },
    ],
    external: ['vue', 'vuetify/components'],
    plugins: [
      nodeResolve({ extensions }),
      babel({
        extensions,
        babelHelpers: 'inline',
      }),
      sass({
        options: {
          charset: false,
        },
        output(styles, styleNodes) {
          //* Complete CSS bundle
          mkdirp(fileURLToPath(new URL('../dist', import.meta.url))).then(() => {
            return Promise.all([
              postcss([autoprefixer]).process(styles, { from: 'src' }),
              postcss([autoprefixer, cssnano({
                preset: 'default',
                postcssZindex: false,
                reduceIdents: false,
              })]).process(styles, { from: 'src' }),
            ])
          }).then((result) => {
            writeFile(fileURLToPath(new URL('../dist/ui-kit.css', import.meta.url)), result[0].css, 'utf8')
          })

          //* Individual CSS files
          for (const { id, content } of styleNodes) {
            const out = path.parse(fixWindowsPath(id).replace(
              fileURLToPath(new URL('../src', import.meta.url)),
              fileURLToPath(new URL('../lib', import.meta.url)),
            ))
            mkdirp(out.dir).then(() => {
              writeFile(path.join(out.dir, `${out.name}.css`), content, 'utf8')
            })
          }
        },
      }),
      alias({
        entries: [
          { find: /^#\/(.*)/, replacement: fileURLToPath(new URL('../src/$1', import.meta.url)) },
        ],
      }),
      {
        async buildEnd() {
          const components = Object.create(null)

          { //* Components
            const { importedIds } = this.getModuleInfo(
              (await this.resolve('src/components/index.ts')).id,
            )
            await Promise.all(importedIds.map(async (id) => {
              const importFrom = path.relative(fileURLToPath(new URL('../src', import.meta.url)), fixWindowsPath(id)).replace(/\.ts$/, '.mjs')

              const { ast } = this.getModuleInfo(id)

              walk(ast, {
                ExportNamedDeclaration(node) {
                  node.specifiers.forEach((node) => {
                    components[node.exported.name] = importFrom
                  })
                  node.declaration?.declarations.forEach((node) => {
                    components[node.id.name] = importFrom
                  })
                },
              })
            }))
          }

          this.emitFile({
            type: 'asset',
            fileName: 'json/importMap.json',
            source: JSON.stringify({
              components: Object.fromEntries(Object.entries(components).map(entry => [entry[0], {
                from: entry[1],
                styles: [],
              }])),
            }, null, 2),
          })
        },
      },
    ],
  },
]
