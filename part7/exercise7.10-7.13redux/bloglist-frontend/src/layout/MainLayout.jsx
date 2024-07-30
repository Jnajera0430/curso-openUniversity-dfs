import React from "react";
import Menu from "../components/Menu";
import ProtectRouter from "../Routers/ProtectRouter";

const MainLayout = () => {
  return (
    <div>
      <Menu />
      <ProtectRouter />
    </div>
  );
};

export default MainLayout;
