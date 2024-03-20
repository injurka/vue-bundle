import type { App } from 'vue'

export interface Options {
  components?: Record<string, any>
}

export function create(options: Options) {
  const {
    components = {},
  } = options

  const install = (app: App) => {
    for (const key in components)
      app.component(key, components[key])
  }

  return install
}
