import React from "react";
import MenuRestofHeaders from "../../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import style from "./style.module.scss";
import BTC from "../../../Assets/Coins/BTC.png";
import BalanceDetails from "../../../Components/BalanceDetails/BalanceDetails";
import Lottie from "react-lottie-player";
import History from '../../../Assets/JsonFiles/History.json'
function CurrencyDetails() {
  return (
    <div className={`scrollableCont`}>
      <MenuRestofHeaders
        backTo={"/wallet"}
        title={
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={BTC} />
            BTC
          </span>
        }
      />
      <div className={`flexedContent`}>
        <div className={style.currDetails}>
          <div className={style.currDetails__card}>
            <div className={style.currDetails__card__topTexts}>
              <p className={style.currDetails__card__text}>BEP20</p>
              <p className={style.currDetails__card__text}>$0.99976 +0.01%</p>
            </div>
            <BalanceDetails
              mt0={style.currDetails__card__mt0}
              className={style.currDetails__card__paddingOverride}
              textLeft={style.currDetails__card__textLeft}
            />
          </div>
          <div className={style.currDetails__border}></div>
          <div className={style.currDetails__card}>
          <div className={style.currDetails__jsonFile}>
          <Lottie
          animationData={History}
          style={{ width: 110, height: 110 }}
          loop
          play
        />
        </div>
        <p className={style.currDetails__noData}>No send history</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyDetails;
