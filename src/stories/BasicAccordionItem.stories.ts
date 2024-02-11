import BasicAccordionItem from '@/components/BasicAccordionItem.vue';
import { argTypeBooleanUnrequired, parameters } from '@/utilities/storybook';

const render = (args: any) => ({
  components: { BasicAccordionItem },
  setup: () => ({ args }),
  template: `<BasicAccordionItem :key="args.isExpandedInitial" v-bind="args">{{ args.default }}</BasicAccordionItem>`,
});

export default {
  argTypes: {
    default: {
      control: 'text',
      description: 'Content exposed when expanded',
      table: {
        defaultValue: { summary: 'None' },
        type: { summary: 'HTML' },
      },
    },
    hasBottomDivider: {
      ...argTypeBooleanUnrequired,
      description: 'Determines whether to include bottom divider',
    },
    hasTopDivider: {
      ...argTypeBooleanUnrequired,
      description: 'Determines whether to include bottom divider',
    },
    isActive: {
      ...argTypeBooleanUnrequired,
      description: 'Determines whether to show "active" indicator (primarily for filters)',
    },
    isExpandedInitial: {
      ...argTypeBooleanUnrequired,
      description:
        'Determines whether content should be expanded by default<br />(Subsequently managed within component)',
    },
    isOptional: {
      ...argTypeBooleanUnrequired,
      description: 'Determines whether to show "(optional)" indicator after label',
    },
    label: {
      control: 'text',
      description: 'Label exposed when collapsed',
      table: {
        defaultValue: { summary: 'None' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    default: 'Lorem Ipsum',
    hasBottomDivider: undefined,
    hasTopDivider: undefined,
    isActive: undefined,
    isExpandedInitial: undefined,
    isOptional: undefined,
    label: 'Demo',
  },
  component: BasicAccordionItem,
  parameters,
  render,
  tags: ['autodocs'],
  title: 'Basic Components/BasicAccordionItem',
};

export const Demo = {};
