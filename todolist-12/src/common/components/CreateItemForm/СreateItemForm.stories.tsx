import { Meta, StoryObj } from "@storybook/react"
import { fn } from '@storybook/test';

import { CreateItemForm, Props } from "./CreateItemForm"
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox"

const meta: Meta<typeof CreateItemForm> = {
  title: "TODOLISTS/CreateItemForm",
  component: CreateItemForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta;
type Story = StoryObj<typeof CreateItemForm>

export const CreateItemFormStory: Story = {
  args: {
    onCreateItem: fn(),
  },
};

const ErrorCreateItemFormWrapper = ({ onCreateItem, initialError }: Props) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(initialError || null)

  const createItemHandler = () => {
    console.log('click')
    const trimmedTitle = title.trim()
    if (trimmedTitle !== "") {
      onCreateItem(trimmedTitle)
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createItemHandler()
    }
  }

  return (
    <div>
      <TextField
        label={"Enter a title"}
        variant={"outlined"}
        value={title}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={changeTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <IconButton onClick={createItemHandler} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
};

export const ErrorStory: Story = {
  render: (args) => <ErrorCreateItemFormWrapper {...args} />, // Указываем, что рендерить
  args: {
    onCreateItem: fn(),
    initialError: "Title is required",
    // initialError можно передать и здесь, если прописать его в Wrapper
  },
};