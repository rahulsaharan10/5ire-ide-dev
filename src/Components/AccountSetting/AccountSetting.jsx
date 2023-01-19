import React from "react";
import style from "./style.module.scss";
function AccountSetting(props) {
  const { title, img } = props;

  return (
    <>
      <div className={style.create}>
        <div className={style.create__account}>
          <img src={img}/>
          <p>{title}</p>
        </div>
      </div>
    </>
  );
}

export default AccountSetting;
