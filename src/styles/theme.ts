import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: { main: "#00875F" },
    grey: {
      100: "#E6E1E6",
      200: "#C4C4CC",
      300: "#373840",
      400: "#323238",
      500: "#29292E",
      600: "#202024",
      700: "#121214",
    },
    error: { main: "#F75A68" },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: "#00875F" },
    grey: {
      100: "#E6E1E6",
      200: "#C4C4CC",
      300: "#373840",
      400: "#323238",
      500: "#29292E",
      600: "#202024",
      700: "#121214",
    },
    error: { main: "#F75A68" },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
  },
});
