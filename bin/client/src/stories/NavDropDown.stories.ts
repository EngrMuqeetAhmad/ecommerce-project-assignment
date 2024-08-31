import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { NavDropDown } from '../components/Nav/NavDropDown';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const meta = {
  title: 'Example/NavDropDown',
  component: NavDropDown,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    open: fn(),
    close: fn(),
  },
} satisfies Meta<typeof NavDropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const open: Story = {};
export const close: Story = {};
