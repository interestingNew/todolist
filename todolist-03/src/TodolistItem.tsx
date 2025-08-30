import type { FilterValues, Task } from './App'
import { Button } from './Button'
import { useRef, useState } from 'react'
import { ChangeEvent, KeyboardEvent } from 'react'

type Props = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterValues) => void
  addTask: (title: string) => void
}

export const TodolistItem = ({ title, tasks, deleteTask, changeFilter, addTask }: Props) => {
  const [inputValue, setInputValue] = useState('')
  const onClickHandler = () => {
    if (inputValue) {
      addTask(inputValue)
      setInputValue('')
    }
  }
  //const inputRef = useRef<HTMLInputElement>(null)   //через хук useRef
  const changeInputTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }
  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickHandler()
    }
  }
  const changeFilterAllHandler = () => {
    changeFilter('all')
  }
  const changeFilterActiveHandler = () => {
    changeFilter('active')
  }
  const changeFilterCompletedHandler = () => {
    changeFilter('completed')
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={inputValue}
          onChange={changeInputTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={'+'} onClick={onClickHandler} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(task.id)
            }
            return (
              <li key={task.id}>
                <input type="checkbox" defaultChecked={task.isDone} />
                <span>{task.title}</span>
                <Button title={'x'} onClick={deleteTaskHandler} />
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button title={'All'} onClick={changeFilterAllHandler} />
        <Button title={'Active'} onClick={changeFilterActiveHandler} />
        <Button title={'Completed'} onClick={changeFilterCompletedHandler} />
      </div>
    </div>
  )
}
