import type { StoryContext } from '@storybook/vue3';

import { DYNAMIC_FONT_COLOR } from '@/types/Storybook';

const formatArgs = (args: any) => {
  args.class = formatClassNames(args);

  return { args };
};

const formatClassNames = (args: any) => {
  return `${args.color}`;
};

const formatSnippet = (code: string, context: StoryContext) => {
  const { args } = context;

  return `<div class="${formatClassNames(args)}">Demo</div>`;
};

const parameters = {
  docs: {
    source: {
      format: false,
      language: 'html',
      transform: formatSnippet,
    },
  },
};

const render = (args: any) => ({
  setup() {
    return formatArgs(args);
  },
  template: '<div class="inline-block p-1" v-bind="args">Demo</div>',
  updated() {
    return formatArgs(args);
  },
});

export default {
  argTypes: {
    color: {
      control: 'select',
      description: 'Realm-dictated font color',
      options: DYNAMIC_FONT_COLOR,
      table: {
        defaultValue: { summary: 'None' },
        type: { summary: 'DYNAMIC_FONT_COLOR' },
      },
    },
  },
  args: {
    color: 'None',
  },
  parameters,
  render,
  tags: ['autodocs'],
  title: 'Foundations/Dynamic Utilities/Font Color',
};

export const Default = {
  args: {
    color: DYNAMIC_FONT_COLOR.None,
  },
};

export const BackgroundPrimaryTier1 = {
  args: {
    color: DYNAMIC_FONT_COLOR['Primary Tier 1'],
  },
  name: 'Primary Tier 1',
};

export const BackgroundPrimaryTier2 = {
  args: {
    color: DYNAMIC_FONT_COLOR['Primary Tier 2'],
  },
  name: 'Primary Tier 2',
};

export const BackgroundPrimaryTier3 = {
  args: {
    color: DYNAMIC_FONT_COLOR['Primary Tier 3'],
  },
  name: 'Primary Tier 3',
};

export const BackgroundPrimaryVariantTier1 = {
  args: {
    color: DYNAMIC_FONT_COLOR['Primary Variant Tier 1'],
  },
  name: 'Primary Variant Tier 1',
};

export const BackgroundPrimaryVariantTier2 = {
  args: {
    color: DYNAMIC_FONT_COLOR['Primary Variant Tier 2'],
  },
  name: 'Primary Variant Tier 2',
};

export const BackgroundPrimaryVariantTier3 = {
  args: {
    color: DYNAMIC_FONT_COLOR['Primary Variant Tier 3'],
  },
  name: 'Primary Variant Tier 3',
};

export const BackgroundSecondary = {
  args: {
    color: DYNAMIC_FONT_COLOR['Secondary'],
  },
  name: 'Secondary',
};

export const BackgroundTertiary = {
  args: {
    color: DYNAMIC_FONT_COLOR['Tertiary'],
  },
  name: 'Tertiary',
};

export const BackgroundSurface = {
  args: {
    color: DYNAMIC_FONT_COLOR['Surface'],
  },
  name: 'Surface',
};

export const BackgroundSurfaceVariant = {
  args: {
    color: DYNAMIC_FONT_COLOR['Surface Variant'],
  },
  name: 'Surface Variant',
};
