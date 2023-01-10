import React from "react";
import style from "./style.module.scss";
import SettingList from "../../Components/SettingList/SettingList.jsx";
import BTC from "../../Assets/Coins/BTC.png";
import ETH from "../../Assets/Coins/ETH.png";
import ADA from "../../Assets/Coins/ADA.png";
import BSC from "../../Assets/Coins/BSC.png";
import Solana from "../../Assets/Coins/solana.png";
import Polygon from "../../Assets/Coins/polygon.png";
import Avilanche from "../../Assets/Coins/avilanche.png";
import Cronos from "../../Assets/Coins/cronos.png";
import BackArrowIcon from "../../Assets/BackArrowIcon.svg";
import { Link } from "react-router-dom";
function WatchWallet() {
  const data = [
    {
      setinglist: "Bitcoin",
      to: "/address",
      ticketcheck: BTC,
    },
    {
      setinglist: "Ethereum",
      // to: "/import-phrase",
      ticketcheck: ETH,
    },
    {
      setinglist: "Cardano",
      ticketcheck: ADA,
    },
    {
      setinglist: "BSC",
      ticketcheck: BSC,
    },
    {
      setinglist: "Solana",
      ticketcheck: Solana,
    },
    {
      setinglist: "Polygon",
      ticketcheck: Polygon,
    },
    {
      setinglist: "Avalanche C Chain",
      ticketcheck: Avilanche,
    },
    {
      setinglist: "Cronos",
      ticketcheck: Cronos,
    },
  ];
  return (
    <>
      <div className={style.cardWhite}>
        <h2
          className={style.cardWhite__title}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img src={BackArrowIcon} width={10} height={"100%"} />
          </Link>
          <span>Watch only wallet</span>
          <div></div>
        </h2>
        {/* <p className={style.cardWhite__subTitle}>
          You can simply identify multiple wallets and label your own wallet.
        </p> */}
        <div className={style.cardWhite__linkOuter}>
          {data.map((data) => (
            <SettingList
              setinglist={data.setinglist}
              to={data.to}
              ticketcheck={data.ticketcheck}
              onClick={data.onClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default WatchWallet;
