import type { TasksState } from "@/features/todolists/model/tasks-reducer";
import type { RootState } from "@/app/store";

export const selectTasks = (state: RootState): TasksState => state.tasks;
