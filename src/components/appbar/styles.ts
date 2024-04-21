"use client";
import { AppBar as MuiAppBar, styled } from "@mui/material";

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  height: "3rem",
  padding: "0.25rem calc((100vw - 60rem)/2)",
  marginBottom: "2rem",
}));
