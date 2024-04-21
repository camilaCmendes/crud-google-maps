"use client";
import Logo from "@/assets/logo.png";
import { Box, Grid, Toolbar } from "@mui/material";
import Image from "next/image";
import { Switch } from "../switch";
import * as S from "./styles";
import { useTheme } from "@/hooks/useTheme";

export const AppBar: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <S.AppBar position="static">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Image src={Logo} alt="logo" />
        </Grid>
        <Grid item>
          <Switch onClick={toggleTheme} />
        </Grid>
      </Grid>
    </S.AppBar>
  );
};
