import React from "react";
import style from "./style.module.scss";

function CongratulationsScreen({ children }) {
  return (
    <div className={style.setPassword__secretPharse}>
      <p className={style.setPassword__secretPharse__grayText} style={{marginBottom:'36px'}}>
      Your Wallet has been created!
      </p>
      {children}
    </div>
  );
}

export default CongratulationsScreen;
