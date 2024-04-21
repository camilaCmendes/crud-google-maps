"use client";
import { darkTheme, lightTheme } from "@/styles/theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";

export type ThemeContextProps = {
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps
);

type Props = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState("light"); // 'light' ou 'dark'
  const muiTheme = theme === "light" ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.style.backgroundColor = muiTheme.palette.background.default;
  }, [muiTheme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
