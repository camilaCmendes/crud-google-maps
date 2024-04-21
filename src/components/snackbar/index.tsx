import { Alert, Snackbar } from "@mui/material";

type Props = {
  handleClose: () => void;
  open: boolean;
  message: string;
  variant: "success" | "warning" | "error" | "info";
};

export const SnackBar: React.FC<Props> = ({
  handleClose,
  open,
  message,
  variant,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={variant}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
