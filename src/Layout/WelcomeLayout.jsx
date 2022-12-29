import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../Assets/Logo.png";
import style from "../Pages/WelcomeScreens/style.module.scss";

function WelcomeLayout() {
  return (
    <div className={"WelcomeLayout"}>
      <div className="WelcomeLayout__container">
        <div className="WelcomeLayout__logo">
          <img src={Logo} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default WelcomeLayout;
