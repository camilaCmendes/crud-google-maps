import { TextField, TextFieldProps, Typography } from "@mui/material";

type Props = TextFieldProps & {
  errorMessage?: string;
};

export const Input: React.FC<Props> = ({ errorMessage, ...rest }) => {
  return (
    <>
      <TextField size="small" {...rest} />{" "}
      {errorMessage && <Typography color={"error"}>{errorMessage}</Typography>}
    </>
  );
};
