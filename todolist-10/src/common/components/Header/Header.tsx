import { changeThemeModeAC } from "@/app/app-reducer";
import { selectThemeMode } from "@/app/app-selectors";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { getTheme } from "@/common/theme/theme";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { containerBoxSx } from "@/common/styles/container.styles";
import { NavButton } from "@/common/components/NavButton/NavButton";
import Switch from "@mui/material/Switch";

export const Header = () => {
   const themeMode = useAppSelector(selectThemeMode);

   const dispatch = useAppDispatch();

   const theme = getTheme(themeMode);

   const changeMode = () => {
      dispatch(changeThemeModeAC(themeMode === "light" ? "dark" : "light"));
   };

   return (
      <AppBar position="static" sx={{ mb: "30px" }}>
         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Container maxWidth="lg" sx={containerBoxSx}>
               <IconButton edge="start" color="inherit">
                  <MenuIcon />
               </IconButton>
               <div>
                  <NavButton>Login</NavButton>
                  <NavButton>Logout</NavButton>
                  <NavButton background={theme.palette.primary.dark}>
                     Faq
                  </NavButton>
                  <Switch color={"default"} onChange={changeMode} />
               </div>
            </Container>
         </Toolbar>
      </AppBar>
   );
};
