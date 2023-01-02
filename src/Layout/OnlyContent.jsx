import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import style from "./style.module.scss";

function OnlyContent() {
  const { Content } = Layout;
  return (
    <div className={`${style.fixedLayout}`}>
      <div className={style.fixedLayout__inner}>
        <Content className={`${style.fixedLayout__content} ${style.fixedLayout__content__paddingX}`}>
          <Outlet />
        </Content>
      </div>
    </div>
  );
}

export default OnlyContent;
