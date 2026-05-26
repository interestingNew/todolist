import { createAppSlice } from "@/common/utils/createAppSlice"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { RootState } from "@/app/store"
import { setAppStatusAC } from "@/app/app-slice"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await tasksApi.getTasks(todolistId)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await tasksApi.createTask(payload)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return { task: res.data.data.item }
        } catch (error) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, {dispatch, rejectWithValue}) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          await tasksApi.deleteTask(payload)
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return payload
        } catch (error) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          const index = tasks.findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) {
            tasks.splice(index, 1)
          }
        },
      },
    ),
    // changeTaskStatusTC: create.asyncThunk(
    //   async (payload: { todolistId: string; taskId: string; status: TaskStatus }, { dispatch, rejectWithValue, getState }) => {
    //     const { todolistId, taskId, status } = payload

    //     const allTodolistsTasks = (getState() as RootState).tasks[todolistId]
    //     const task = allTodolistsTasks.find(t => t.id === taskId)

    //     if(!task) {
    //       return rejectWithValue(null)
    //     }

    //     const model: UpdateTaskModel = {
    //       description: task.description,
    //       title: task.title,
    //       priority: task.priority,
    //       startDate: task.startDate,
    //       deadline: task.deadline,
    //       status,
    //     }

    //     try {
    //       dispatch(setAppStatusAC({ status: 'loading' }))
    //       const res = await tasksApi.updateTask({ todolistId, taskId, model })
    //       dispatch(setAppStatusAC({ status: 'succeeded' }))
    //       return { task: res.data.data.item }
    //     } catch (error) {
    //       dispatch(setAppStatusAC({ status: 'failed' }))
    //       rejectWithValue(null)
    //     }
    //   },
    //   {
    //     fulfilled: (state, action) => {
    //       const task = state[action.payload.task.todoListId].find(task => task.id === action.payload?.task.id)
    //       if(task) {
    //         task.status = action.payload.task.status
    //       }
    //     }
    //   }
    // ),
    // changeTaskTitleTC: create.asyncThunk(
    //   async (payload: { todolistId: string; taskId: string; title: string }, { dispatch, rejectWithValue, getState }) => {
    //     const { todolistId, taskId, title } = payload

    //     const allTodolistsTasks = (getState() as RootState).tasks[todolistId]
    //     const task = allTodolistsTasks.find(t => t.id === taskId)

    //     if(!task) {
    //       rejectWithValue(null)
    //     }

    //     const model: UpdateTaskModel = {
    //       description: task.description,
    //       title,
    //       priority: task.priority,
    //       startDate: task.startDate,
    //       deadline: task.deadline,
    //       status: task.status,
    //     }
        
    //     try {
    //       dispatch(setAppStatusAC({ status: 'loading' }))
    //       const res = await tasksApi.updateTask({todolistId, taskId, model})
    //       dispatch(setAppStatusAC({ status: 'succeeded' }))
    //       return { task: res.data.data.item }
    //     } catch(error) {
    //       dispatch(setAppStatusAC({ status: 'failed' }))
    //       return rejectWithValue(null)
    //     }
    //   },
    //   {
    //     fulfilled: (state, action) => {
    //       const task = state[action.payload.task.todoListId].find(t => t.id === action.payload.task.id)
    //       if(task) {
    //         task.title = action.payload.task.title
    //       }
    //     }
    //   }
    // ),
    updateTaskTC: create.asyncThunk(
      async(payload: {todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel>}, 
        {dispatch, getState, rejectWithValue}
      ) => {
        const {todolistId, taskId, domainModel} = payload

        const allTodolistsTasks = (getState() as RootState).tasks[todolistId]
        const task = allTodolistsTasks.find(t => t.id === taskId)

        if(!task) {
          return rejectWithValue(null)
        }
        
        const model: Partial<UpdateTaskModel> = {
          description: task.description,
          title: domainModel.title? domainModel.title : task.title,
          status: domainModel.title? task.status : domainModel.status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline
        }
        
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await tasksApi.updateTask({todolistId, taskId, model})
          dispatch(setAppStatusAC({ status: 'succeeded'}))
          return {task: res.data.data.item}
        } catch (error) {
          dispatch(setAppStatusAC({ status: 'failed'}))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
            const task = state[action.payload.task.todoListId].find(t => t.id === action.payload.task.id)
            if(task) {
              task.title = action.payload.task.title
              task.status = action.payload.task.status
            }
        }
      }
    )
  }),
  extraReducers(builder) {
    builder
    .addCase(createTodolistTC.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    .addCase(deleteTodolistTC.fulfilled, (state, action) => {
      delete state[action.payload.id]
    })
  },
})

export const { selectTasks } = tasksSlice.selectors
export const { fetchTasksTC, createTaskTC, deleteTaskTC, updateTaskTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TasksState = Record<string, DomainTask[]>