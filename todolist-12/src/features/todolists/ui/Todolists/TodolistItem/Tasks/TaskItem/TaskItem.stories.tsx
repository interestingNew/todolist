import { Meta, StoryObj } from "@storybook/react"
import { fn } from '@storybook/test';
import { TaskItem } from "./TaskItem";
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from '@/app/store';
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "@/common/hooks";


const meta: Meta<typeof TaskItem> = {
  title: "TASK/TaskItem",
  component: TaskItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
}

export default meta;
type Story = StoryObj<typeof TaskItem>

export const TaskIsDoneStory: Story = {
  args: {
    task: {id: 'dsfdfsf', title: 'JS', isDone: true},
    todolistId: "string"
  },
};

export const TaskNotIsDoneStory: Story = {
  args: {
    task: {id: 'dsfdfsf', title: 'JS', isDone: false},
    todolistId: "string"
  },
};