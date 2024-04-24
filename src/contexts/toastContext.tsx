"use client";
import React, { createContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

type ToastContextType = {
  showToast: (
    message: string,
    severity?: "error" | "warning" | "info" | "success"
  ) => void;
};

const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("success");

  const showToast = (
    message: string,
    severity: "error" | "warning" | "info" | "success" = "success"
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastContext;
