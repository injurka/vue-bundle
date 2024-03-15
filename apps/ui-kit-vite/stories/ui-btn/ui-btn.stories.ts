import type { Meta, StoryObj } from '@storybook/vue3'
import { UiHeader } from '../../src/components/ui-header/ui-header'
import { UiBtn } from '../../src/components/ui-btn/ui-btn'

const meta = {
  title: 'Buttons/ui-btn',
  component: UiBtn,
  tags: ['autodocs'],
  decorators: [],
  argTypes: {
    text: { control: 'text', defaultValue: '' },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      defaultValue: 'secondary',
    },
  },
  args: {
    text: 'ui-btn',
  },
} satisfies Meta<typeof UiBtn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    color: 'primary',
    text: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    color: 'secondary',
    text: 'secondary',
  },
}

export const AllOptions: Story = {
  args: {},
  render(args) {
    return {
      components: { UiBtn, PageHeader: UiHeader },
      setup() {
        return { args }
      },
      template: `
      <div>
        <div class="button">
          <page-header title="primary" />
          <ui-btn variant="text" color="primary"> text  </ui-btn>
          <ui-btn variant="flat" color="primary"> flat  </ui-btn>
          <ui-btn variant="elevated" color="primary"> elevated  </ui-btn>
          <ui-btn variant="tonal" color="primary">  tonal </ui-btn>
          <ui-btn variant="outlined" color="primary"> outlined  </ui-btn>
          <ui-btn variant="plain" color="primary">  plain </ui-btn>
        </div>
        <div class="button">
          <page-header title="secondary" />
          <ui-btn variant="text" color="secondary"> text  </ui-btn>
          <ui-btn variant="flat" color="secondary"> flat  </ui-btn>
          <ui-btn variant="elevated" color="secondary"> elevated  </ui-btn>
          <ui-btn variant="tonal" color="secondary">  tonal </ui-btn>
          <ui-btn variant="outlined" color="secondary"> outlined  </ui-btn>
          <ui-btn variant="plain" color="secondary">  plain </ui-btn>
        </div>
      </div>
      `,
    }
  },
}
