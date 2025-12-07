import { v1 } from "uuid";
import { todolistsReducer, deleteTodolistAC, createTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC } from "./todolists-reducer";
import type { Todolist } from "../App";
import { beforeEach, expect, test } from 'vitest'

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {
   todolistId1 = v1()
   todolistId2 = v1()

   startState = ([
      { id: todolistId1, title: 'What to learn', filter: 'all' },
      { id: todolistId2, title: 'What to buy', filter: 'all' },
   ])
})

test('correct todolist should be deleted', () => {
   
   const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

   expect(endState.length).toBe(1)
   expect(endState[0].title).toBe('What to buy')
})

test('correct todolist should be created', () => {
   
   const newTitle = 'New todolist'
   const endState = todolistsReducer(startState, createTodolistAC(newTitle))

   expect(endState.length).toBe(3)
   expect(endState[0].title).toBe(newTitle)
   expect(endState[2].id).toBe(todolistId2)
})

test('correct todolist should change its title', () => {
   
   const newTitle = 'New title'
   const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId1, newTitle}))

   expect(endState.length).toBe(2)
   expect(endState[0].title).toBe(newTitle)
})

test('correct todolist should change its filter', () => {
   
   const newFilter = 'active'
   const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, newFilter}))

   expect(endState.length).toBe(2)
   expect(endState[1].filter).toBe(newFilter)
   expect(endState[0].filter).toBe('all')
})