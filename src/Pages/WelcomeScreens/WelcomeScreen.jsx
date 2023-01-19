import React from "react";
import style from "./style.module.scss";
import PlaceLogo from "../../Assets/PlaceLog.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import { setLogin } from "../../Store/reducer/counter";
function WelcomeScreen() {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("this is iside components", count);
  function handleLogin() {
    dispatch(setLogin(true));
    setTimeout(() => {
      navigate("/wallet");
    }, 2000);
  }
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
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
