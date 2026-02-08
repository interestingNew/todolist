import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task } from "@/features/todolists/model/tasks-reducer";
import { getListItemSx } from "./TaskItem.styles";

type TaskItemTypeProps = {
   todolistId: string,
   task: Task
}

export const TaskItem = ({todolistId, task}: TaskItemTypeProps) => {
   const dispatch = useDispatch();

   const deleteTask = () => {
      dispatch(deleteTaskAC({ todolistId, taskId: task.id }));
   };

   const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      const newStatusValue = e.currentTarget.checked;
      dispatch(
         changeTaskStatusAC({
            todolistId,
            taskId: task.id,
            isDone: newStatusValue,
         })
      );
   };

   const changeTaskTitle = (title: string) => {
      dispatch(
         changeTaskTitleAC({
            todolistId,
            taskId: task.id,
            title: title,
         })
      );
   };

   return (
      <ListItem sx={getListItemSx(task.isDone)}>
         <div>
            <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
            <EditableSpan value={task.title} onChange={changeTaskTitle} />
         </div>
         <IconButton onClick={deleteTask} aria-label="delete">
            <DeleteTwoToneIcon color="primary" />
         </IconButton>
      </ListItem>
   );
};
