import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: notification ? "" : "none",
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(addNotification(""));
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [notification, dispatch]);

  return <div style={style}>{notification}</div>;
};

export default Notification;
