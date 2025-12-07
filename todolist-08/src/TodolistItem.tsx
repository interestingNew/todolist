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
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from './model/store'
import { TasksState } from './App'
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC } from './model/tasks-reducer'


type Props = {
  todolist: Todolist
  changeFilter: (todolistId: string, filter: FilterValues) => void
  deleteTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
  const dispatch = useDispatch()
  const tasks = useSelector<AppRootState, TasksState>(state => state.tasks)

  const {
    todolist: { id, title, filter },
    changeFilter,
    deleteTodolist,
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
    dispatch(createTaskAC({ todolistId: id, title: title }))
  }

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === 'active') {
    filteredTasks = todolistTasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = todolistTasks.filter(task => task.isDone)
  }

  return (
    <div>
      <div className={'container'}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <DeleteTwoToneIcon style={{ margin: '15px', cursor: 'pointer' }} onClick={deleteTodolistHandler} />
      </div>

      <CreateItemForm onCreateItem={createTaskHandler} color={'primary'} />
      {filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map(task => {
            const deleteTaskHandler = () => {
              dispatch(deleteTaskAC({ todolistId: id, taskId: task.id }))
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              dispatch(changeTaskStatusAC({ todolistId: id, taskId: task.id, isDone: newStatusValue }))
            }

            const changeTaskTitleHandler = (title: string) => {
              dispatch(changeTaskTitleAC({ todolistId: id, taskId: task.id, title: title }))
            }

            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                  <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                </div>
                <IconButton onClick={deleteTaskHandler} aria-label="delete">
                  <DeleteTwoToneIcon color='primary' />
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
