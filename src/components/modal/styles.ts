"use client";
import { styled, Dialog } from "@mui/material";

export const Modal = styled(Dialog)(({}) => ({
  "& .MuiPaper-root": {
    maxWidth: "60rem",
    width: "100%",
    padding: "1rem",
  },
}));
