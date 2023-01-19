import React from "react";
import style from "./style.module.scss";
import PlaceLogo from "../../Assets/PlaceLog.svg";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";

function WelcomeScreen() {
  // const count = useSelector((state) => state.counter);
  // console.log("CVOUN", count);
  return (
    <div className={style.cardWhite}>
      <MenuRestofHeaders logosilver={true} title="5ire Non-Custodial Wallet" />
      <div className={style.cardWhite__cardInner}>
        <div className={style.cardWhite__cardInner__centerLogo}>
          <div className={style.cardWhite__cardInner__innerLogocontact}>
            <img src={PlaceLogo} />
            <div className={style.cardWhite__cardInner__innercontact}>
              <h1>5irechain Wallet</h1>
              <p>The decentralized wallet</p>
            </div>
          </div>
        </div>
        <div className={style.cardWhite__linkOuter}>
          <Link to="/createNewWallet" className="bluegradient">
            Create a new wallet
          </Link>
          <Link className="grayBtn" to="/watch-list">
            Import Wallet
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
