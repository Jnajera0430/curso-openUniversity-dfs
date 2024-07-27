import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRouter = () => {
  const userLogged = useSelector((state) => state.userLogged);
  if (!userLogged) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectRouter;
