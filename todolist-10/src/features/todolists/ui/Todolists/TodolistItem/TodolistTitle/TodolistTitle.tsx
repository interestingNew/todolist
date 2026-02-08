import styles from './TodolistTitle.module.css'
import { useDispatch } from "react-redux";
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {
   changeTodolistTitleAC,
   deleteTodolistAC,
   Todolist,
} from "@/features/todolists/model/todolists-reducer";

type TodolistTitleProps = {
   todolist: Todolist;
};
export const TodolistTitle = (props: TodolistTitleProps) => {
   const {
      todolist: { id, title },
   } = props;

   const dispatch = useDispatch();

   const deleteTodolist = () => {
      dispatch(deleteTodolistAC({ id: id }));
   };

   const changeTodolistTitle = (title: string) => {
      dispatch(changeTodolistTitleAC({ id: id, newTitle: title }));
   };
   return (
      <div className={styles.container}>
         <h3>
            <EditableSpan value={title} onChange={changeTodolistTitle} />
         </h3>
         <DeleteTwoToneIcon
            style={{ margin: "15px", cursor: "pointer" }}
            onClick={deleteTodolist}
         />
      </div>
   );
};
