import React, { useState } from "react";
import style from "./style.module.scss";
import SwapIcon from "../../Assets/SwapIcon.svg";
import CopyIcon from "../../Assets/CopyIcon.svg";
import WalletCardLogo from "../../Assets/walletcardLogo.svg";
import { InputField } from "../../Components/InputField/InputFieldSimple";
import Approve from "../Approve/Approve";
function Swap() {
  const [activeTab, setActiveTab] = useState("one");
  const activeIst = () => {
    setActiveTab("one");
  };
  const activeSecond = () => {
    setActiveTab("two");
  };
  const activeThree = () => {
    setActiveTab("three");
  };
  const activeFour = () => {
    setActiveTab("four");
  };
  return (
    <>
    <div className={style.swap}>
      <div className={style.swap__swapCopy}>
        <div className={style.swap__swapSec}>
          <h3>From Native</h3>
          <p>300 5ire</p>
          <span>
            0xxx0...lsh223 <img src={CopyIcon} width={11} height={11} />
          </span>
        </div>
        <div className={style.swap__icon}>
          <img src={SwapIcon} />
        </div>
        <div className={style.swap__swapSec}>
          <h3>From Native</h3>
          <p>300 5ire</p>
          <span>
            0xx ...lsh223 <img src={CopyIcon} width={11} height={11} />
          </span>
        </div>
      </div>
      <div className={style.swap__swapAccount}>
        <div>
          <InputField
            placeholder={"Enter Swap Amount "}
            addonAfter={
              <span className={style.swap__pasteText}>
                <img src={WalletCardLogo} />
                5ire
              </span>
            }
          />
          <span className={style.swap__spanbalanceText}>
            Balance 00.0000 5IRE
          </span>
        </div>
        <div className={style.swap__activeBalnce}>
          <button
            onClick={activeIst}
            className={`${style.swap__activeBalanceSelect__buttons} 
              ${
                activeTab === "one" &&
                style.swap__activeBalanceSelect__buttons__active
              }
            `}
          >
            25 %
          </button>
          <button
            onClick={activeSecond}
            className={`${style.swap__activeBalanceSelect__buttons}  ${
              activeTab === "two" &&
              style.swap__activeBalanceSelect__buttons__active
            }`}
          >
            50 %
          </button>
          <button
            onClick={activeThree}
            className={`${style.swap__activeBalanceSelect__buttons}  ${
              activeTab === "three" &&
              style.swap__activeBalanceSelect__buttons__active
            }`}
          >
            70 %
          </button>
          <button
            onClick={activeFour}
            className={`${style.swap__activeBalanceSelect__buttons}  ${
              activeTab === "four" &&
              style.swap__activeBalanceSelect__buttons__active
            }`}
          >
            100 %
          </button>
        </div>
      </div>
      <div className={style.swap__transactionFee}>
        <p>Transaction Fee : 0.0002 5IRE</p>
      </div>
    </div>
    <Approve/>
    </>
  );
}

export default Swap;
