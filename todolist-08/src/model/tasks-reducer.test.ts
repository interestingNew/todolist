import { test, expect, beforeEach } from "vitest";
import type { TasksState } from "../App";
import { tasksReducer, deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } from "./tasks-reducer";
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer";

let startState: TasksState = {}

beforeEach(() => {
   startState = {
      todolistId1: [
         { id: '1', title: 'HTML&CSS', isDone: true },
         { id: '2', title: 'JS', isDone: true },
         { id: '3', title: 'ReactJS', isDone: false },
      ],
      todolistId2: [
         { id: '1', title: 'Rest API', isDone: true },
         { id: '2', title: 'GraphQL', isDone: false },
      ]
   }
})

test("array should be created for new todolist", () => {
   
   const newTitle = "New todolist"
   const endState = tasksReducer(startState, createTodolistAC(newTitle))

   const keys = Object.keys(endState)
   const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
   if (!newKey) {
      throw Error('New key should be added')
   }

   expect(keys.length).toBe(3)
   expect(endState[newKey]).toEqual([])

})

test("array should be deleted with todolist", () => {
   
   const endState = tasksReducer(startState, deleteTodolistAC("todolistId1"))
   const keys = Object.keys(endState)

   expect(keys.length).toBe(1)
   expect(endState["todolistId1"]).toBeUndefined()
   expect(endState["todolistId1"]).not.toBeDefined()
   expect(startState["todolistId1"]).not.toBeUndefined()
   expect(startState["todolistId1"][0].title).toBe('HTML&CSS')

})

test("deleted task", () => {
   
   const endState = tasksReducer(startState, deleteTaskAC({todolistId: "todolistId1",taskId: '2'}))

   expect(endState["todolistId1"].length).toBe(2)
   expect(endState["todolistId1"][1].id).toBe('3')
   expect(startState["todolistId1"].length).toBe(3)
   expect(startState["todolistId1"][1].id).toBe('2')
   expect(endState).toEqual({
      todolistId1: [
         { id: '1', title: 'HTML&CSS', isDone: true },
         { id: '3', title: 'ReactJS', isDone: false }
      ],
      todolistId2: [
         { id: '1', title: 'Rest API', isDone: true },
         { id: '2', title: 'GraphQL', isDone: false },
      ]
   })

})

test("create task", () => {
   
   const endState = tasksReducer(startState, createTaskAC({todolistId: "todolistId1", title: 'PK'}))

   expect(endState["todolistId1"].length).toBe(4)
   expect(endState["todolistId2"].length).toBe(2)
   expect(endState["todolistId1"][0].id).toBeDefined()
   expect(endState["todolistId1"][0].title).toBe('PK')
   expect(endState["todolistId1"][0].isDone).toBeFalsy()

})

test("status task should be change", () => {
   
   const endState = tasksReducer(startState, changeTaskStatusAC({todolistId: 'todolistId1', taskId:'3', isDone: true}))

   expect(endState['todolistId1'][2].isDone).toBeTruthy()
   expect(startState['todolistId1'][2].isDone).toBeFalsy()

})

test("title task should be change", () => {
   
   const endState = tasksReducer(startState, changeTaskTitleAC({todolistId: 'todolistId2', taskId:'2', title: 'Redux'}))

   expect(endState['todolistId2'][1].id).toBe('2')
   expect(endState['todolistId2'][1].title).toBe('Redux')
   expect(startState['todolistId2'][1].title).toBe('GraphQL')

})