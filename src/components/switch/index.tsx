import { FormControlLabel, FormGroup, SwitchProps } from "@mui/material";
import * as S from "./styles";

type Props = SwitchProps & {};

export const Switch: React.FC<Props> = ({ ...rest }) => {
  return <S.Switch {...rest} />;
};
