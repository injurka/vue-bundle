import type { Meta, StoryObj } from '@storybook/vue3'
import { UiHeader } from '../../src/components/ui-header'

const meta = {
  title: 'Typography/ui-header',
  component: UiHeader,
  argTypes: {
    title: { control: 'text', defaultValue: '' },
  },
  args: {},
  tags: ['autodocs'],
} satisfies Meta<typeof UiHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Заголовок',
  },
}

export const WithViewWrapper: Story = {
  args: {
    title: 'Заголовок',
  },
  render(args) {
    return {
      components: { UiHeader },
      setup() {
        return { args }
      },
      template: `
        <div id="app">
          <ui-header :title="args.title" />
        </div>
      `,
    }
  },
}
