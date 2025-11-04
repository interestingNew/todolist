import type { ChangeEvent } from 'react'
import type { FilterValues, Task, Todolist } from './App'
import { CreateItemForm } from './CreateItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, IconButton } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import { containerBoxSx } from './Todolist.styles'
import { getListItemSx } from './Todolist.styles'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'


type Props = {
  todolist: Todolist
  tasks: Task[]
  deleteTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, filter: FilterValues) => void
  createTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  deleteTodolist: (todolistId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
  const {
    todolist: { id, title, filter },
    tasks,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    deleteTodolist,
    changeTaskTitle,
    changeTodolistTitle,
  } = props

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(id, title)
  }

  const createTaskHandler = (title: string) => {
    createTask(id, title)
  }

  return (
    <div>
      <div className={'container'}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <DeleteTwoToneIcon style={{margin: '15px', cursor: 'pointer'}} onClick={deleteTodolistHandler}/>
      </div>

      <CreateItemForm onCreateItem={createTaskHandler} color={'primary'}/>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(id, task.id)
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatus(id, task.id, newStatusValue)
            }

            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, task.id, title)
            }

            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                  <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                </div>
                <IconButton onClick={deleteTaskHandler} aria-label="delete">
                  <DeleteTwoToneIcon color='primary'/>
                </IconButton>
              </ListItem>
            )
          })}
        </List>
      )}
      <Box sx={containerBoxSx}>
        <Button variant={filter === 'all' ? 'outlined' : 'text'} color='inherit'
          onClick={() => changeFilterHandler('all')}>{'All'}</Button>
        <Button variant={filter === 'active' ? 'outlined' : 'text'} color='success'
          onClick={() => changeFilterHandler('active')}>{'Active'}</Button>
        <Button variant={filter === 'completed' ? 'outlined' : 'text'} color='info'
          onClick={() => changeFilterHandler('completed')}>{'Completed'}</Button>
      </Box>

    </div>
  )
}
