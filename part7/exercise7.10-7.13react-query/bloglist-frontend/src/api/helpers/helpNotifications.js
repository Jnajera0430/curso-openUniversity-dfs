import { useContext } from "react";
import AppContext from "../AppContext";

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(AppContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(AppContext);
  return notificationAndDispatch[1];
};
