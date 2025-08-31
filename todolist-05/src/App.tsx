import './App.css'
import { useState } from 'react'
import { v1 } from 'uuid'
import { TodolistItem } from './TodolistItem'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'


type TasksType = {
  [key: string]: Array<Task>
}

export const App = () => {

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ])

  const [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false }
    ],
    [todolistId2]: [
      { id: v1(), title: 'meat', isDone: true },
      { id: v1(), title: 'rice', isDone: false }
    ]
  })

  const deleteTask = (todolistId: string, taskId: string) => {
    const todolistTasks = tasks[todolistId];
    const newTodolistTasks = todolistTasks.filter(task => task.id !== taskId)
    tasks[todolistId] = newTodolistTasks
    setTasks({ ...tasks })
    // второй вариант - сразу в переменную newTasks кидаем копию объекта tasks, а свойство [todolistId] перезатираем на выражение которое говорит нам: отфильтрованные таски из свойства [todolistId] объекта tasks, у которых id не равен входящему параметру taskId. И дальше просто в setTasks кидаем newTasks, т.к это уже копия ссылки на объект, react копию перерисует.
    // const newTasks = {
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].filter(task => task.id !== taskId),
    // }
    // setTasks(newTasks)
  }

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    // const newTodolists = todolists.map(todolist => {                             //подробная запись
    //   return todolist.id === todolistId ? {...todolist, filter} : todolist
    // })
    // setTodolists(newTodolists)
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist)) //короткая запись
  }

  const createTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    const todolistTasks = tasks[todolistId]
    const newTodolistTasks = [newTask, ...todolistTasks]
    tasks[todolistId] = newTodolistTasks
    setTasks({ ...tasks })
    // второй пример аналогичен как в функции deleteTask
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    const todolistTasks = tasks[todolistId];
    const newTodolistTasks = todolistTasks.map(task => task.id === taskId ? { ...task, isDone } : task)
    tasks[todolistId] = newTodolistTasks
    setTasks({ ...tasks })
    // второй пример аналогичен как в функции deleteTask
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  return <div className="app">
    {todolists.map(todolist => {
      const todolistTasks = tasks[todolist.id]
      let filteredTasks = todolistTasks
      if (todolist.filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
      }
      if (todolist.filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
      }
      return <TodolistItem
        key={todolist.id}
        todolist={todolist}
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
        deleteTodolist={deleteTodolist} />
    })}
  </div>
}
