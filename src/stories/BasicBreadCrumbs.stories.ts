import type { BreadCrumb } from '@/types/BreadCrumb';

import BasicBreadCrumbs from '@/components/BasicBreadCrumbs.vue';

const breadCrumbs: BreadCrumb[] = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Search Results',
    url: '/rvs-for-sale',
  },
  {
    label: 'Vehicle Details',
  },
];

const formatSnippet = () => {
  return '<BasicBreadCrumbs :breadCrumbs="breadCrumbs" />';
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

export default {
  argTypes: {
    breadCrumbs: {
      control: 'object',
      table: {
        defaultValue: { summary: '[]' },
      },
    },
  },
  component: BasicBreadCrumbs,
  tags: ['autodocs'],
  title: 'Basic Components/BasicBreadCrumbs',
};

export const Demo = {
  args: {
    breadCrumbs: breadCrumbs,
  },
  parameters,
};
