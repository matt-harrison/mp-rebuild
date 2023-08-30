import type { StoryContext } from '@storybook/vue3';

import { formatKebabCase } from '@/utilities/format';
import { ICON } from '@/types/Icon';

const formatSnippet = (code: string, context: StoryContext) => {
  const tag = context.component?.__name;
  const { args, argTypes } = context;

  let classNames: string[] = [];

  let attributes = Object.entries(args).map((arg: any) => {
    const key = arg[0];
    let value = arg[1];

    // TODO: show intentionally redundant attributes (non-Demo stories) -> add None to booleans in presentation layer.

    // TODO: TypeScript doesn't believe the implict shapes of Storybook's native types.
    const componentProps = context.component as any;
    const condition = argTypes[key].if as any;
    const conditionKey = condition?.arg;
    const conditionValue = condition?.eq;

    // If arg is conditional, hide when conditional is not met.
    const isConditionMet = condition ? args[conditionKey] == conditionValue : true;
    const isConstant = Object.keys(argTypes).includes(key) && !!argTypes[key].constant;
    const isDefault = value === componentProps.props[key]?.default;

    if (argTypes[key].isCss) {
      classNames.push(value);
    }

    if (isConstant && value !== 'None') {
      Object.entries(argTypes[key].options).forEach(([optionKey, optionValue]) => {
        if (value === optionValue) {
          value = `${argTypes[key].constant}.${optionKey}`;
        }
      });
    }

    if (isConditionMet && !isDefault && !!value && value !== 'None') {
      return `${isConstant || typeof value === 'boolean' ? ':' : ''}${formatKebabCase(key)}="${value}"`;
    }
  });

  classNames = classNames.filter((className) => !!className);

  if (classNames.length > 0) attributes.push(`class="${classNames.join(' ')}"`);

  attributes = attributes.filter((attribute) => !!attribute).sort();

  return args.default
    ? `<${tag}\n\t${attributes.join(' \n\t')}\n>${args.default}</${tag}>`
    : `<${tag}\n\t${attributes.join(' \n\t')}\n/>`;
};

const formatSnippetMinimal = (code: string) => {
  return code.replace(/<[/]*template>/g, '');
};

// Invert key/value pairs bc Storybook control option format is unintuitive.
const getLabelsFromOptions = (options: any) => {
  const labels: { [key: string]: string } = {};

  Object.entries(options).forEach(([key, value]) => {
    labels[`${value}`] = key;
  });

  return labels;
};

const getVariableName = (input: any) => {
  return Object.keys(input)[0];
};

const iconControl = {
  constant: getVariableName({ ICON }),
  control: 'select',
  options: ICON,
  table: {
    defaultValue: { summary: 'None' },
    type: { summary: 'Icon' },
  },
};

const iconControlWithNone = {
  constant: getVariableName({ ICON }),
  control: 'select',
  options: {
    None: undefined,
    ...ICON,
  },
  table: {
    defaultValue: { summary: 'None' },
    type: { summary: 'Icon' },
  },
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

export {
  formatSnippet,
  formatSnippetMinimal,
  getLabelsFromOptions,
  getVariableName,
  iconControl,
  iconControlWithNone,
  parameters,
};
