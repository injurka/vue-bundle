import 'vue/jsx'
import type { FunctionalComponent } from 'vue'

// @skip-build
import type { ComponentPublicInstance } from 'vue'

declare module 'vue' {
  export type JSXComponent<Props = any> = { new(): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}
