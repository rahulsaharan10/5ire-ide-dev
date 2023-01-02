import React, { useState } from "react";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import CoinsTable from "../../Components/CoinsTable/CoinsTable";
import BTC from "../../Assets/Coins/BTC.png";
import style from "./style.module.scss";
function Send() {
  const data = [
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "sendCurrency",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "sendCurrency",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "sendCurrency",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "sendCurrency",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "sendCurrency",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "sendCurrency",
    },
  ];
  const [currData, setCurrData] = useState(data);
  return (
    <div className={`scrollableCont ${style.send}`}>
      <MenuRestofHeaders backTo={"/wallet"} title={"Send"} searchTo="/" />
      <div className={`flexedContent`}>
        <CoinsTable dataArray={currData} />
      </div>
    </div>
  );
}

export default Send;
