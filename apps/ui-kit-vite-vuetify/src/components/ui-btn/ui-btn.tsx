import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { VBtn } from 'vuetify/components'

// Styles
import './ui-btn.scss'

// Utilities
import { useRender } from '#/helpers'

export const UiBtn = defineComponent({
  name: 'UiBtn',

  props: {
    style: {
      type: [String],
      default: '',
    },
    class: {
      type: [String],
      default: '',
    },
    text: {
      type: [String, Number],
      default: '',
    },
    color: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary',
    },
  },

  setup(props, { slots }) {
    useRender(() => (
      <VBtn
        class={[
          'ui-btn',
          props.color,
          props.class,
        ]}
        style={[
          props.style,
        ]}
      >
        { props.text && (
          <span>
            { props.text }
          </span>
        )}
        { slots.default?.() }
      </VBtn>
    ))

    return { }
  },
})

export type UiBtn = InstanceType<typeof UiBtn>
