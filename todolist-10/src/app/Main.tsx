import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { createTodolistAC } from "@/features/todolists/model/todolists-reducer";
import "./App.css";
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists";

export const Main = () => {
   const dispatch = useAppDispatch();

   const createTodolist = (title: string) => {
      dispatch(createTodolistAC(title));
   };

   return (
      <div className="app">
         <Container>
            <Grid container sx={{ mb: "30px" }}>
               <CreateItemForm
                  onCreateItem={createTodolist}
                  color={"inherit"}
               />
            </Grid>
            <Grid container spacing={4}>
               <Todolists />
            </Grid>
         </Container>
      </div>
   );
};
