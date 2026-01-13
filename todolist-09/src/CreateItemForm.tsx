import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'

type Props = {
  onCreateItem: (title: string) => void
  color: "primary" | "secondary" | "info" | "success" | "warning" | "inherit" | "default"
}

export const CreateItemForm = ({ onCreateItem, color }: Props) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== '') {
      onCreateItem(trimmedTitle)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }

  return (
    <div>
      <TextField label={'Enter a title'}
        variant={'outlined'}
        size={'small'}
        error={!!error}
        helperText={error}
        value={title}
        onChange={changeTitleHandler}
        onKeyDown={createItemOnEnterHandler} />
      <IconButton onClick={createItemHandler} color={color}><AddCircleTwoToneIcon /></IconButton>
    </div>
  )
}