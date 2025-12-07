import type { TasksState } from "../App";
import { CreateTodolistAction, DeleteTodolistAction } from "./todolists-reducer";
import { v1 } from "uuid";

const initialState: TasksState = {}

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTask | CreateTask | ChangeTaskStatus | ChangeTaskTitle

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
   switch(action.type) {
      case 'create_todolist':
         return {...state, [action.payload.todolistId]: []};
      case 'delete_todolist':
         const newState = {...state}     //обязательно создаем копию объекта, не можем мутировать входящий объект!!!!!!!!!
         delete newState[action.payload.id];
         return newState
      case 'delete_task':
         return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId) };
      case 'create_task':
         const newTask = { id: v1(), title: action.payload.title, isDone: false }
         return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
      case 'change_task_status':
         return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id == action.payload.taskId ? { ...task, isDone: action.payload.isDone } : task) }
      case 'change_task_title':
         return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task) }
      default: 
         return state
   }
}

export const deleteTaskAC = (payload: {todolistId: string, taskId: string}) => {
   return {type: 'delete_task', payload} as const
}
export type DeleteTask = ReturnType<typeof deleteTaskAC>

export const createTaskAC = (payload: {todolistId: string, title: string}) => {
   return {type: 'create_task', payload} as const
}
export type CreateTask = ReturnType<typeof createTaskAC>

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
   return {type: 'change_task_status', payload} as const
}
export type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => {
   return {type: 'change_task_title', payload} as const
}

export type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>