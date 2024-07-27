import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRouter = () => {
  const userLogged = useSelector((state) => state.userLogged);

  if (userLogged) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
