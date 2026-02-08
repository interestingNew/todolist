import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import {
   changeTodolistFilterAC,
   FilterValues,
   Todolist,
} from "@/features/todolists/model/todolists-reducer";
import { useDispatch } from "react-redux";
import { containerBoxSx } from "@/common/styles/container.styles";

type FilterButtonsTypeProps = {
   todolist: Todolist
}

export const FilterButtons = ({todolist}: FilterButtonsTypeProps) => {
   const {id, filter} = todolist

   const dispatch = useDispatch();
   
   const changeFilter = (filter: FilterValues) => {
      dispatch(changeTodolistFilterAC({ id: id, newFilter: filter }));
   };

   return (
      <>
         <Box sx={containerBoxSx}>
            <Button
               variant={filter === "all" ? "outlined" : "text"}
               color="inherit"
               onClick={() => changeFilter("all")}
            >
               {"All"}
            </Button>
            <Button
               variant={filter === "active" ? "outlined" : "text"}
               color="success"
               onClick={() => changeFilter("active")}
            >
               {"Active"}
            </Button>
            <Button
               variant={filter === "completed" ? "outlined" : "text"}
               color="info"
               onClick={() => changeFilter("completed")}
            >
               {"Completed"}
            </Button>
         </Box>
      </>
   );
};
