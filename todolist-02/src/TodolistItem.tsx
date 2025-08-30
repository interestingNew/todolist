import type {Task} from './App'
import {Button} from './Button'
import {FilterType} from './App'

type Props = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: number)=>void
  filterHandler: (titleButton:FilterType)=>void
}

export const TodolistItem = ({title, tasks, deleteTask, filterHandler}: Props) => {
  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input/>
          <Button title={'+'} />
        </div>
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                return (
                    <li key={task.id}>
                      <input type="checkbox" checked={task.isDone} />
                      <span>{task.title}</span>
                      <Button title={"x"} onClick={()=>deleteTask(task.id)}/>
                    </li>
                )
              })}
            </ul>
        )}
        <div>
          <Button title={'All'} onClick={()=>filterHandler('All')}/>
          <Button title={'Active'} onClick={()=>filterHandler('Active')}/>
          <Button title={'Completed'} onClick={()=>filterHandler('Completed')}/>
        </div>
      </div>
  )
}
