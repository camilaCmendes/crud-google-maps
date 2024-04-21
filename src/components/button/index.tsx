import { Button as MuiButton, ButtonProps } from "@mui/material";

type Props = ButtonProps & {};

export const Button: React.FC<Props> = ({ ...rest }) => {
  return <MuiButton variant="contained" {...rest} />;
};
