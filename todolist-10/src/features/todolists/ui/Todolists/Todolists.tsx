import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTodolists } from "@/features/todolists/model/todolists-selectors";
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export const Todolists = () => {
   const todolists = useAppSelector(selectTodolists);

   return (
      <>
      {todolists.map((todolist) => {
         return (
            <Grid key={todolist.id}>
               <Paper elevation={5} sx={{ p: "0 20px 20px 20px" }}>
                  <TodolistItem
                     todolist={todolist}
                  />
               </Paper>
            </Grid>
         );
      })}
      </>
   )
};
