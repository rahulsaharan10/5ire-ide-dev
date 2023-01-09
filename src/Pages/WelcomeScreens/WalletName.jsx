import React from "react";
import style from "./style.module.scss";
import {
  InputFieldOnly
} from "../../Components/InputField/InputFieldSimple.jsx";
function WalletName() {
  return (
    <>
      <div className={style.cardWhite}>
        <h2 className={style.cardWhite__title}>Wallet Name</h2>
        <p className={style.cardWhite__subTitle}>
          You can simply identify multiple wallets and label your own wallet.
        </p>
        <div className={style.cardWhite__linkOuter}>
        <InputFieldOnly placeholder={"Token Name"} label="Amount" />
        <div className={style.send__infoText}>0 BTC ~ $88.02</div>
        </div>
      </div>
    </>
  );
}

export default WalletName;
