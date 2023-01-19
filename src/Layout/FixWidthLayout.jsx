import { Layout } from "antd";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LogoHorizontal from "../Assets/PNG/LogoHorizontal.png";
import BalanceDetails from "../Components/BalanceDetails/BalanceDetails";
import MenuRestofHeaders from "../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import MenuFooter from "../Components/MenuFooter/MenuFooter";
import style from "./style.module.scss";

function FixWidthLayout() {
  const { Content } = Layout;
  const getLocation = useLocation();

  const path = getLocation.pathname.replace("/", "");

  return (
    <div className={`${style.fixedLayout}`}>
      <div className={style.fixedLayout__inner}>
        {(path === "wallet" || path === "swapapprove") && (
          <div className={style.fixedLayout__inner__walletLayout}>
            <div className={style.decoratedBg} style={{ textAlign: "left" }}>
              {/* <img src={LogoHorizontal} width={155} height={20} /> */}
              <BalanceDetails />
            </div>
          </div>
        )}

        {path === "history" && (
          <MenuRestofHeaders backTo={"/"} title={"History"} />
        )}
        {path === "setting" && (
          <MenuRestofHeaders backTo={"/"} title={"Setting"} searchTo="/" />
        )}
        <Content className={style.fixedLayout__content}>
          <Outlet />
        </Content>
        <MenuFooter />
      </div>
    </div>
  );
}

export default FixWidthLayout;
