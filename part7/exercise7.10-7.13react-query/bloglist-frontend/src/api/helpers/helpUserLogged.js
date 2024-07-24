import { useContext } from "react";
import AppContext from "../AppContext";

export const useUserloggedValue = () => {
  const userLoggedAndDispatch = useContext(AppContext);
  return userLoggedAndDispatch[2];
};

export const useUserLoggedDispatch = () => {
  const userLoggedAndDispatch = useContext(AppContext);
  return userLoggedAndDispatch[3];
};
