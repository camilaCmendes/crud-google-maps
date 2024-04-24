import { useContext } from "react";
import ToastContext from "../contexts/toastContext";

export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};
