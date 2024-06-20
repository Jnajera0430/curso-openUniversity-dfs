/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
  useNotificationDispatch,
  useNotificationValue,
} from "../helpNotification";

const Notification = () => {
  const notify = useNotificationValue();
  const dispatch = useNotificationDispatch();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    const timeID = setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);
    return () => clearTimeout(timeID);
  }, [notify, dispatch]);

  if (!notify) return null;

  return <div style={style}>{notify}</div>;
};

export default Notification;
