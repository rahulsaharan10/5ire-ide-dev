import React from "react";
import style from "./style.module.scss";

function WalletName() {
  return (
    <>
      <div className={style.cardWhite}>
        <h2 className={style.cardWhite__title}>Wallet Name</h2>
        <p className={style.cardWhite__subTitle}>
          You can simply identify multiple wallets and label your own wallet.
        </p>
        <div className={style.cardWhite__linkOuter}>
          <button>Back</button>
          <button>Continue</button>
        </div>
      </div>
    </>
  );
}

export default WalletName;
