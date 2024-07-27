import React from "react";
import Menu from "../components/Menu";
import ProtectRouter from "../Routers/ProtectRouter";

const MainLayout = () => {
  return (
    <div>
      <Menu />
      <h2>blog app</h2>

      <ProtectRouter />
    </div>
  );
};

export default MainLayout;
