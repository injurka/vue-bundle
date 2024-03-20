/* eslint-disable ts/method-signature-style */
import 'vue/jsx'

// Types

declare global {
  interface HTMLCollection {
    [Symbol.iterator](): IterableIterator<Element>
  }
}
