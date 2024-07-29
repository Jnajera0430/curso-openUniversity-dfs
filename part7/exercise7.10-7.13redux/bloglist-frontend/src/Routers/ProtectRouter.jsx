import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRouter = () => {
  const userLogged = useSelector((state) => state.userLogged);
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

  if (!userLogged && !loggedUserJSON) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectRouter;
