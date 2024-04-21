import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: { main: "#00875F" },
    grey: {
      50: "#F2F2F2",
      100: "#E6E1E6",
      200: "#C8C8CE",
      300: "#717171",
      400: "#333333",
      500: "#212529",
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
      50: "#F2F2F2",
      100: "#E6E1E6",
      200: "#C8C8CE",
      300: "#717171",
      400: "#333333",
      500: "#212529",
    },
    error: { main: "#F75A68" },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
  },
});
