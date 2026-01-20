import type { Meta, StoryObj } from "@storybook/preact";
import Button, { type ButtonProps } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

// Primary Variants
export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    label: "Button Label",
  },
};

export const PrimarySmall: Story = {
  args: {
    variant: "primary",
    size: "sm",
    label: "Button Label",
  },
};

export const PrimaryDisabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: true,
    label: "Button Label",
  },
};

// Secondary Variants
export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    label: "Button Label",
  },
};

export const SecondarySmall: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    label: "Button Label",
  },
};

export const SecondaryDisabled: Story = {
  args: {
    variant: "secondary",
    size: "md",
    disabled: true,
    label: "Button Label",
  },
};

// Tertiary Variants
export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    size: "md",
    label: "Button Label",
  },
};

export const TertiarySmall: Story = {
  args: {
    variant: "tertiary",
    size: "sm",
    label: "Button Label",
  },
};

export const TertiaryDisabled: Story = {
  args: {
    variant: "tertiary",
    size: "md",
    disabled: true,
    label: "Button Label",
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div class="flex flex-col gap-4">
      <div class="flex gap-4 items-center">
        <Button variant="primary" size="md" label="Button label" />

        <Button variant="secondary" size="md" label="Button label" />

        <Button variant="tertiary" size="md" label="Button label" />
      </div>
      <div class="flex gap-4 items-center">
        <Button variant="primary" size="sm" label="Button label" />

        <Button variant="secondary" size="sm" label="Button label" />

        <Button variant="tertiary" size="sm" label="Button label" />
      </div>
      <div class="flex gap-4 items-center">
        <Button variant="primary" size="md" disabled label="Button label" />

        <Button variant="secondary" size="md" disabled label="Button label" />

        <Button variant="tertiary" size="md" disabled label="Button label" />
      </div>
    </div>
  ),
};
