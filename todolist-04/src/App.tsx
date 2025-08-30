import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  const [filter, setFilter] = useState<FilterValues>('all')

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ])

  const deleteTask = (taskId: string) => {
    const filteredTasks = tasks.filter(task => {
      return task.id !== taskId
    })
    setTasks(filteredTasks)
  }

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  let filteredTasks = tasks
  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.isDone)
  }

  const createTask = (title: string) => {
    const newTask = {id: v1(), title, isDone: false}
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const changeTaskStatus = (idTask: string, isDone: boolean) => {
    // const task = tasks.find(t => idTask === t.id)            //можно и так
    // if (task) {                                              //здесь проверка на undefined
    //   task.isDone = valueCheked
    //   setTasks([...tasks])
    // }
    const newState = tasks.map(task => task.id == idTask ? {...task, isDone} : task)   //Для изменения элемента массива в state лучше использовать метод массива map
    setTasks(newState)
  }

  return (
      <div className="app">
        <TodolistItem title="What to learn"
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}/>
      </div>
  )
}
