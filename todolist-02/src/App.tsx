import { useState } from 'react'
import './App.css'
import { TodolistItem } from './TodolistItem'

export type Task = {
  id: number
  title: string
  isDone: boolean
}

export type FilterType = 'All' | 'Active' | 'Completed'

export const App = () => {
  const [tasks, setTasks] = useState<Task[]> ([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
    { id: 5, title: 'Typescript', isDone: false },
    { id: 6, title: 'RTK query', isDone: false },
  ])

  const deleteTask = (taskId: number) => {
    const filteredTasks = tasks.filter(task => {
      return task.id !== taskId
    })
    setTasks(filteredTasks)
  }

  const filterHandler = (titleButton: FilterType) => {
    setFilterBut(titleButton)
  }

  const [filterBut, setFilterBut] = useState<FilterType>('All')

  let currentTasks = tasks                  //важно создать переменную с текущими тасками и инициализировать ее нашими тасками
  if(filterBut === "Active") {
    currentTasks = tasks.filter(task => !task.isDone)
  }
  if(filterBut === "Completed") {
    currentTasks = tasks.filter(task => task.isDone)
  }
  
  return (
    <div className="app">
      <TodolistItem title="What to learn" 
                    tasks={currentTasks}          //важно атрибуту tasks присвоить переменную текущие таски
                    deleteTask={deleteTask}
                    filterHandler={filterHandler}/>
    </div>
  )
}
