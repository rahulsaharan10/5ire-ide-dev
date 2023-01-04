import React from "react";
import MenuRestofHeaders from "../../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import style from "./style.module.scss";
import BTC from "../../../Assets/Coins/BTC.png";
import ETH from "../../../Assets/Coins/ETH.png";
import ArrowDashedLine from "../../../Assets/ArrowDashedLine.svg";
import ButtonComp from "../../../Components/ButtonComp/ButtonComp";
import { useNavigate } from "react-router-dom";
function SwapDetails() {
    const navigate = useNavigate();

  return (
    <div className={`scrollableCont`}>
      <MenuRestofHeaders backTo={"/swap"} title={"Swap"} />
      <div className={`flexedContent`}>
        <div className={style.swapDetails}>
          <div className={style.swapDetails__iconsTop}>
            <img src={BTC} width={30} height={30} />
            <img src={ArrowDashedLine} width={144} height={12} />
            <img src={ETH} width={30} height={30} />
          </div>
          <div className={style.swapDetails__valueText}>
            <p className={style.swapDetails__valueText__text}>0.000283 BTC</p>
            <p className={style.swapDetails__valueText__text}>0.000283 BTC</p>
          </div>
          <div className={style.swapDetails__border}></div>
          <div className={style.swapDetails__address}>
            <p className={style.swapDetails__address__key}>From</p>
            <p className={style.swapDetails__address__val}>
              My Wallet:<sapn> 02344455465svfdskcds</sapn>
            </p>
          </div>
          <div className={style.swapDetails__address}>
            <p className={style.swapDetails__address__key}>To</p>
            <p className={style.swapDetails__address__val}>
              My Wallet:<sapn> 02344455465svfdskcds</sapn>
            </p>
          </div>
          <div className={style.swapDetails__border}></div>
          <div className={style.swapDetails__keyValuesText}>
            <div className={style.swapDetails__keyValuesText__inner}>
              <p className={style.swapDetails__keyValuesText__key}>Type</p>
              <p className={style.swapDetails__keyValuesText__val}>On-Chain</p>
            </div>
            <div className={style.swapDetails__keyValuesText__inner}>
              <p className={style.swapDetails__keyValuesText__key}>Network Fee</p>
              <p className={style.swapDetails__keyValuesText__val}>0.005 BTC ($ 1.26)</p>
            </div>
          </div>
          <ButtonComp
              onClick={() => navigate("/wallet")}
              text={"Confirm"}
              maxWidth={"100%"}
            />
        </div>
      </div>
    </div>
  );
}

export default SwapDetails;
