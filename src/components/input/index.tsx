import { TextField, TextFieldProps } from "@mui/material";

type Props = TextFieldProps & {};

export const Input: React.FC<Props> = ({ ...rest }) => {
  return <TextField size="small" {...rest} />;
};
