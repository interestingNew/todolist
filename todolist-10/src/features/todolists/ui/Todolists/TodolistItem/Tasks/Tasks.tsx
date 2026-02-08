import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTasks } from "@/features/todolists/model/tasks-selectors";
import List from "@mui/material/List";
import { Todolist } from "@/features/todolists/model/todolists-reducer";
import { TaskItem } from "./TaskItem/TaskItem";

type TasksTypeProps = {
   todolist: Todolist;
};

export const Tasks = ({ todolist }: TasksTypeProps) => {
   const { id, filter } = todolist;

   const tasks = useAppSelector(selectTasks);

   const todolistTasks = tasks[id];
   let filteredTasks = todolistTasks;
   if (filter === "active") {
      filteredTasks = todolistTasks.filter((task) => !task.isDone);
   }
   if (filter === "completed") {
      filteredTasks = todolistTasks.filter((task) => task.isDone);
   }

   return (
      <>
         {filteredTasks.length === 0 ? (
            <p>Тасок нет</p>
         ) : (
            <List>
               {filteredTasks.map((task) => (
                  <TaskItem key={task.id} todolistId={id} task={task} />
               ))}
            </List>
         )}
      </>
   );
};
