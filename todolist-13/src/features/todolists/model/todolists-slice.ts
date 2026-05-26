import { Todolist } from './../api/todolistsApi.types';
import { createAction, createAsyncThunk, createReducer, createSlice, current, nanoid } from "@reduxjs/toolkit"
import { todolistsApi } from "../api/todolistsApi"

// export const deleteTodolistAC = createAction<{ id: string }>("todolists/deleteTodolist")
// export const createTodolistAC = createAction("todolists/createTodolist", (title: string) => {
//   return { payload: { title, id: nanoid() } }
// })
// export const changeTodolistTitleAC = createAction<{ id: string; title: string }>("todolists/changeTodolistTitle")
// export const changeTodolistFilterAC = createAction<{ id: string; filter: FilterValues }>(
//   "todolists/changeTodolistFilter",
// )

// const initialState: Todolist[] = []

// export const todolistsReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(deleteTodolistAC, (state, action) => {
//       const index = state.findIndex((todolist) => todolist.id === action.payload.id)
//       if (index !== -1) {
//         state.splice(index, 1)
//       }
//     })
//     .addCase(createTodolistAC, (state, action) => {
//       state.push({ ...action.payload, filter: "all" })
//     })
//     .addCase(changeTodolistTitleAC, (state, action) => {
//       const index = state.findIndex((todolist) => todolist.id === action.payload.id)
//       if (index !== -1) {
//         state[index].title = action.payload.title
//       }
//     })
//     .addCase(changeTodolistFilterAC, (state, action) => {
//       const todolist = state.find((todolist) => todolist.id === action.payload.id)
//       if (todolist) {
//         todolist.filter = action.payload.filter
//       }
//     })
// })



export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: state => state
  },
  extraReducers: builder => {
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      return action.payload.todolists.map(tl => {
        return { ...tl, filter: 'all' }
      })
    })
    .addCase(fetchTodolistsTC.rejected, (state, action) => {
      // обработка ошибки при запросе за тудулистами
    })
    .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    })
    .addCase(changeTodolistTitleTC.rejected, (state, action) => {
      // обработка ошибки при запросе изменении названия тудулиста
    })
    .addCase(createTodolistTC.fulfilled, (state, action) => {
      state.push({ ...action.payload.todolist, filter: "all", addedDate: '', order: 0 })
    })
    .addCase(createTodolistTC.rejected, (state, action) => {
      // обработка ошибки при запросе создания тудулиста
    })
    .addCase(deleteTodolistTC.fulfilled, (state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    })
    .addCase(deleteTodolistTC.rejected, (state, action) => {
      // обработка ошибки при запросе удаления тудулиста
    })
  },
  reducers: (create) => ({
    // deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
    //   const index = state.findIndex((todolist) => todolist.id === action.payload.id)
    //   if (index !== -1) {
    //     state.splice(index, 1)
    //   }
    // }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
  }),
})

export const { changeTodolistFilterAC } =
  todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"


export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistsTC`,
  async (_, thunkAPI) => {
    try{
      const res = await todolistsApi.getTodolists();
      return { todolists: res.data }
    } catch(error) {
      return thunkAPI.rejectWithValue(null)
    }
  }
)

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (payload: { id: string; title: string }, thunkAPI) => {
    try{
      await todolistsApi.changeTodolistTitle(payload)
      return payload
    } catch(error) {
      return thunkAPI.rejectWithValue(null)
    }
  }
)

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistAC`,
  async (title: string, thunkAPI) => {
    try{
      const res = await todolistsApi.createTodolist(title)
      return {todolist: res.data.data.item}
    } catch(error) {
      return thunkAPI.rejectWithValue(null)
    }
  }
)

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (id: string, thunkAPI) => {
    try{
      await todolistsApi.deleteTodolist(id)
      return {id: id}
    } catch(error) {
      return thunkAPI.rejectWithValue(null)
    }
  }
)