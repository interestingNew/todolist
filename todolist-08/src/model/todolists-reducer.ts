import type {Todolist} from '../App'
import { v1 } from 'uuid'
import { FilterValues } from '../App'

type Actions = DeleteTodolistAction | CreateTodolistAction |ChangeTodolistTitleAction | ChangeTodolistFilterAction

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
   switch(action.type) {
      case 'delete_todolist': {
         return state.filter(todolist => todolist.id !== action.payload.id)
      }
      case 'create_todolist': {
         const newTodolist: Todolist = { id: action.payload.todolistId, title: action.payload.title, filter: 'all' }
         return [newTodolist, ...state]
      }
      case 'change_todolist_title': {
         return state.map(todolist => todolist.id === action.payload.id ? { ...todolist, title: action.payload.newTitle } : todolist)
      }
      case 'change_todolist_filter': {
         return state.map(todolist => todolist.id === action.payload.id ? { ...todolist, filter: action.payload.newFilter } : todolist)
      }
      default:
         return state
   }
}

export const deleteTodolistAC = (id: string) => {
   return {type: 'delete_todolist', payload: {id}} as const
}
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export const createTodolistAC = (title: string) => {
   const todolistId = v1()
   return {type: 'create_todolist', payload: {todolistId, title}} as const
}
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

export const changeTodolistTitleAC = (payload: {id: string, newTitle: string}) => {
   return {type: 'change_todolist_title', payload} as const
}
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistFilterAC = (payload: {id: string, newFilter: FilterValues}) => {
   return {type: 'change_todolist_filter', payload} as const
}
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>