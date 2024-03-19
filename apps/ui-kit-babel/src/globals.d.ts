import 'vue/jsx'

// Types
import type { Events, VNode } from 'vue'

declare global {
  interface HTMLCollection {
    [Symbol.iterator](): IterableIterator<Element>
  }
}
