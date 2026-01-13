import './App.css'
import { useState } from 'react'
import { CreateItemForm } from '../CreateItemForm'
import { TodolistItem } from '../TodolistItem'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { containerBoxSx } from '../Todolist.styles'
import { NavButton } from '../NavButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import { changeTodolistFilterAC, createTodolistAC, deleteTodolistAC, changeTodolistTitleAC } from '../model/todolists-reducer'
import {useAppDispatch} from '../common/hooks/useAppDispatch'
import {useAppSelector} from '../common/hooks/useAppSelector'
import { selectTodolists } from '../model/todolists-selectors'

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}
export type Task = {
  id: string
  title: string
  isDone: boolean
}
type ThemeMode = 'light' | 'dark'
export type FilterValues = 'all' | 'active' | 'completed'
export type TasksState = Record<string, Task[]>

export const App = () => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(selectTodolists)

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title))
  }

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({id: todolistId}))
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, newTitle: title }))
  }

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, newFilter: filter }))
  }

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#4682B4',
      },
    },
  })

  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='static' sx={{ mb: '30px' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Container maxWidth="lg" sx={containerBoxSx}>
              <IconButton edge='start' color='inherit'>
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton>Login</NavButton>
                <NavButton>Logout</NavButton>
                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                <Switch color={'default'} onChange={changeMode} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container >
          <Grid container sx={{ mb: '30px' }}>
            <CreateItemForm onCreateItem={createTodolist} color={'inherit'} />
          </Grid>
          <Grid container spacing={4}>
            {todolists.map(todolist => {
              return (
                <Grid key={todolist.id}>
                  <Paper elevation={5} sx={{ p: '0 20px 20px 20px' }}>
                    <TodolistItem
                      todolist={todolist}
                      changeFilter={changeFilter}
                      deleteTodolist={deleteTodolist}
                      changeTodolistTitle={changeTodolistTitle} />
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}
