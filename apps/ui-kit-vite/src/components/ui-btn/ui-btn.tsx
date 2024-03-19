import {  defineComponent, type PropType } from 'vue'

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
      <button
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
      </button>
    ))

    return { }
  },
})

export type UiBtn = InstanceType<typeof UiBtn>
