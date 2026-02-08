import type { Todolist } from "@/features/todolists/model/todolists-reducer";
import type { RootState } from "@/app/store";

export const selectTodolists = (state: RootState): Todolist[] =>
   state.todolists;
