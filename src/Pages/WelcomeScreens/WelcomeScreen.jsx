import React from "react";
import style from "./style.module.scss";
import PlusBordredIcon from "../../Assets/PlusBordredIcon.svg";
import RefreshIcon from "../../Assets/RefreshIcon.svg";
import ArrowRightIcon from "../../Assets/ArrowRightIcon.svg";
import { Link } from "react-router-dom";
import Wallet from "../../Assets/wallet.svg";
function WelcomeScreen() {
  return (
    <div className={style.cardWhite}>
      <h2 className={style.cardWhite__title}>
        You Already Know <br/>How To Use It...
      </h2>
      <div className={style.cardWhite__linkOuter}>
        <Link
          className={style.cardWhite__linkOuter__link}
          to="/add-secret-phrase"
        >
          <span className={style.cardWhite__linkOuter__linkImage}>
            <img src={RefreshIcon} width={20} height={20} />
            Restore using passphrase
          </span>
          <span>
            <img src={ArrowRightIcon} width={8} height={15} />
          </span>
        </Link>
        <div className={style.cardWhite__linkOuter__hr}></div>
        <Link to="/createNewWallet" className={style.cardWhite__linkOuter__link}>
          <span className={style.cardWhite__linkOuter__linkImage}>
            <img src={PlusBordredIcon} width={20} height={20} />
            Create a new wallet
          </span>
          <span>
            <img src={ArrowRightIcon} width={8} height={15} />
          </span>
        </Link>

        <div className={style.cardWhite__linkOuter__hr}></div>
        <Link className={style.cardWhite__linkOuter__link} to="/watch-list">
          <span className={style.cardWhite__linkOuter__linkImage}>
            <img src={Wallet} width={20} height={20} />
            Watch Only Wallet
          </span>
          <span>
            <img src={ArrowRightIcon} width={8} height={15} />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default WelcomeScreen;
