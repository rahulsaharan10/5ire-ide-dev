import React, { useState } from "react";
import style from "./style.module.scss";
import FilterIcon from "../../Assets/FilterIcon.svg";
import CoinsTable from "../../Components/CoinsTable/CoinsTable";
import BTC from "../../Assets/Coins/BTC.png";
import { Link } from "react-router-dom";
function Wallet() {
  const data = [
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "currencyDetails",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "currencyDetails",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "currencyDetails",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "currencyDetails",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "currencyDetails",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "currencyDetails",
    },
  ];
  const [currData, setCurrData] = useState(data);
  return (
    <div className={style.wallet}>
      <div className={style.wallet__heading}>
        <h3 className={style.wallet__heading__text}>Tokens</h3>
        <div className={style.wallet__heading__filter}>
          <Link to="/manage"><img src={FilterIcon}  /></Link>
        </div>
      </div>
      <div className={style.wallet__tableOuter}>
        <CoinsTable dataArray={currData} />
      </div>
    </div>
  );
}

export default Wallet;
