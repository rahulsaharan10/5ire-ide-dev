import React, { useState } from "react";
import style from "./style.module.scss";
import WalletIcon from "../../Assets/WalletIcon.svg";
import DefiIcon from "../../Assets/DefiIcon.svg";
import SettignIcon from "../../Assets/SettignIcon.svg";
import HistoryIcon from "../../Assets/HistoryIcon.svg";
import { Link, Navigate, useLocation } from "react-router-dom";
import ButtonComp from "../ButtonComp/ButtonComp";
import FooterStepOne, { FooterStepThree, FooterStepTwo } from "./FooterContinue";
function MenuFooter() {
  // const [activeLink, setactiveLink] = useState("wallet");
  const getLocation = useLocation();
  const path = getLocation.pathname.replace("/", "");
  return (
    <div className={`${style.menuItems} welcomeFooter`}>
      {path === "wallet" && (
        <Link
          to="/wallet"
          // onClick={() => setactiveLink("wallet")}
          className={`${style.menuItems__items} ${
            path === "wallet" ? style.menuItems__items__active : ""
          }`}
        >
          <div className={style.menuItems__items__img}>
            <img src={WalletIcon} />
          </div>
          <span className={style.menuItems__items__title}>Wallet</span>
        </Link>
      )}
      {path === "history" && (
        <Link
          to="/history"
          // onClick={() => setactiveLink("history")}
          className={`${style.menuItems__items} ${
            path === "history" ? style.menuItems__items__active : ""
          }`}
        >
          <div className={style.menuItems__items__img}>
            <img src={HistoryIcon} />
          </div>
          <span className={style.menuItems__items__title}>History</span>
        </Link>
      )}
      {path === "setting" && (
        <Link
          to="/setting"
          // onClick={() => setactiveLink("setting")}
          className={`${style.menuItems__items} ${
            path === "setting" ? style.menuItems__items__active : ""
          }`}
        >
          <div className={style.menuItems__items__img}>
            <img src={SettignIcon} />
          </div>
          <span className={style.menuItems__items__title}>Setting</span>
        </Link>
      )}

      {path === "" ||
        (path === "createNewWallet" && (
          <div className={style.menuItems__needHelp}>
            <p>
              Need help? Contact <a>Support</a>
            </p>
          </div>
        ))}
      {path === "beforebegin" && <FooterStepOne />}
      {path === "createwalletchain" && <FooterStepTwo />}
      {path === "setPassword" && <FooterStepThree />}

    </div>
  );
}

export default MenuFooter;
