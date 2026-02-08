import type { Todolist } from "@/features/todolists/model/todolists-reducer";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { Tasks } from "./Tasks/Tasks";
import { FilterButtons } from "./FilterButtons/FilterButtons";
import { useDispatch } from "react-redux";
import { createTaskAC } from "@/features/todolists/model/tasks-reducer";
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm";

type Props = {
   todolist: Todolist;
};

export const TodolistItem = ({ todolist }: Props) => {
   const dispatch = useDispatch();

   const createTask = (title: string) => {
      dispatch(createTaskAC({ todolistId: todolist.id, title }));
   };

   return (
      <div>
         <TodolistTitle todolist={todolist} />
         <CreateItemForm onCreateItem={createTask} color={"primary"} />
         <Tasks todolist={todolist} />
         <FilterButtons todolist={todolist} />
      </div>
   );
};
