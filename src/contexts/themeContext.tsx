"use client";
import { darkTheme, lightTheme } from "@/styles/theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import React, { ReactNode, createContext, useState } from "react";

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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
