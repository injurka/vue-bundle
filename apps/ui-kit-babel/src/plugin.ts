import type { App } from 'vue'

import { UiHeader } from './components/ui-header'
import { UiBtn } from './components/ui-btn/ui-btn'

const components = [
  UiHeader,
  UiBtn,
]

export default {
  install(app: App) {
    for (const key in components)
      app.component(key, components[key])
  },
}
