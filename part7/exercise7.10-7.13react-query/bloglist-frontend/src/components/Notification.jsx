import { useEffect } from "react";
import {
  useNotificationDispatch,
  useNotificationValue,
} from "../api/helpers/helpNotifications";

const Notification = () => {
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch();
  useEffect(() => {
    if (notification.message) {
      const timeID = setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
      return () => clearTimeout(timeID);
    }
  }, [notification, dispatch]);

  if (notification.message === null) {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
};

export default Notification;
