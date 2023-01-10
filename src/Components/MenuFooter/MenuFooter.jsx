import React, { useState } from "react";
import style from "./style.module.scss";
import WalletIcon from "../../Assets/WalletIcon.svg";
import DefiIcon from "../../Assets/DefiIcon.svg";
import SettignIcon from "../../Assets/SettignIcon.svg";
import HistoryIcon from "../../Assets/HistoryIcon.svg";
import { Link, useLocation } from "react-router-dom";
function MenuFooter() {
  // const [activeLink, setactiveLink] = useState("wallet");
  const getLocation = useLocation();
  const path = getLocation.pathname.replace("/", "");
  return (
    <div className={style.menuItems}>
     <Link to="/wallet"
        // onClick={() => setactiveLink("wallet")}
        className={`${style.menuItems__items} ${
          path === "wallet" ? style.menuItems__items__active : ""
        }`}
      >
        <div className={style.menuItems__items__img}>
          <img src={WalletIcon} />
        </div>
        <span className={style.menuItems__items__title}>
          Wallet
        </span>
      </Link>
      {/* <Link to="/defi"
        // onClick={() => setactiveLink("defi")}
        className={`${style.menuItems__items} ${
          path === "defi" ? style.menuItems__items__active : ""
        }`}
      >
        <div className={style.menuItems__items__img}>
          <img src={DefiIcon} />
        </div>
        <span className={style.menuItems__items__title}>
          Defi
        </span>
      </Link> */}
      <Link to="/history"
        // onClick={() => setactiveLink("history")}
        className={`${style.menuItems__items} ${
          path === "history" ? style.menuItems__items__active : ""
        }`}
      >
        <div className={style.menuItems__items__img}>
          <img src={HistoryIcon} />
        </div>
        <span className={style.menuItems__items__title}>
          History
        </span>
      </Link>
      <Link to="/setting"
        // onClick={() => setactiveLink("setting")}
        className={`${style.menuItems__items} ${
          path === "setting" ? style.menuItems__items__active : ""
        }`}
      >
        <div className={style.menuItems__items__img}>
          <img src={SettignIcon} />
        </div>
        <span className={style.menuItems__items__title}>
          Setting
        </span>
      </Link>
    </div>
  );
}

export default MenuFooter;
