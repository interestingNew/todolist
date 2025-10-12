import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import { Button } from './Button'


type CreateItemFormPropsType = {
  onCreateItem: (title: string) => void
}
export const CreateItemForm = ({ onCreateItem }: CreateItemFormPropsType) => {

  const [itemTitle, setItemTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value)
    setError(null)
  }
  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }
  const createItemHandler = () => {
    const trimmedTitle = itemTitle.trim();
    if (trimmedTitle) {
      onCreateItem(trimmedTitle)
      setItemTitle('')
    } else {
      setError('Title is required')
    }
  }

  return <div>
    <input className={error ? 'error' : ''}
      value={itemTitle}
      onChange={changeItemTitleHandler}
      onKeyDown={createItemOnEnterHandler} />
    <Button title={'+'} onClick={createItemHandler} />
    {error && <div className={'error-message'}>{error}</div>}
  </div>
}