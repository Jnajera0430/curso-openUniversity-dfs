const Notification = ({ message, type = "error" }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={type === "error" ? "error" : "success"}>{message}</div>
  );
};

export default Notification;
