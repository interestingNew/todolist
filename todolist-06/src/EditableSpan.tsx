import { useState } from "react"
import { ChangeEvent } from "react"

type EditableSpanPropsType = {
  value: string
  onChangeTitle: (newTitle: string) => void
}

export const EditableSpan = ({ value, onChangeTitle }: EditableSpanPropsType) => {
  const [title, setTitle] = useState(value)
  const [editMode, setEditMode] = useState(false)

  const turnOnEditMode = () => {
    setEditMode(true)
  }
  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const turnOffEditMode = () => {
    setEditMode(false)
    onChangeTitle(title)
  }

  return (
    editMode ?
      <input type="text" onChange={onChangeInputValue} autoFocus value={title} onBlur={turnOffEditMode}/> :
      <span onDoubleClick={turnOnEditMode}>{value}</span>
  )
}