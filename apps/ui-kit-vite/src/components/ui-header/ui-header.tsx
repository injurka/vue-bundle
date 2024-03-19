import { defineComponent } from 'vue'

// Styles
import './ui-header.scss'

// Utilities
import { useRender } from '#/helpers'



export const UiHeader = defineComponent({
  name: 'UiHeader',

    props: {
    style: {
      type: [String],
      default: '',
    },
    class: {
      type: [String],
      default: '',
    },
    title: {
      type: [String, Number],
      default: '',
    },
  },
  
  setup(props, { slots }) {
    useRender(() => (
      <h2
        class={[
          'ui-header',
          props.class,
        ]}
        style={[
          props.style,
        ]}
      >
        { slots.default?.() }
        { props.title }
      </h2>
    ))

    return { }
  },
})

export type UiHeader = InstanceType<typeof UiHeader>
