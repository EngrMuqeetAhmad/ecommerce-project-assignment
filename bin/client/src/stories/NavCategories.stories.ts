import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { NavCategories } from '../components/Nav/NavCategories';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
const meta = {
  title: 'Example/NavCategories',
  component: NavCategories,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    data: [
      {
        name: 'men',
        subCategories: [
          {
            name: 'shirts',
          },
          {
            name: 'under garments',
          },
          {
            name: 'perfumes',
          },
        ],
      },
      {
        name: 'women',
        subCategories: [
          {
            name: 'shirts',
          },
          {
            name: 'under garments',
          },
          {
            name: 'perfumes',
          },
        ],
      },
    ],
  },
} satisfies Meta<typeof NavCategories>;

export default meta;
type Story = StoryObj<typeof meta>;

export const data: Story = {};
