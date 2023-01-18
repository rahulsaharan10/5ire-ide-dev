import React, { useState } from "react";
import {
  InputField,
  InputFieldOnly,
} from "../../Components/InputField/InputFieldSimple";
import WalletCardLogo from "../../Assets/walletcardLogo.svg";
import style from "./style.module.scss";
import Approve from "../Approve/Approve";
function Send() {
  const [activeTab, setActiveTab] = useState("native");

  const activeSend = () => {
    setActiveTab("native");
  };
  const activeSwap = () => {
    setActiveTab("evm");
  };
  return (
    <>
    <div className={style.sendSec}>
      <div className={`scrollableCont ${style.sendSec__sourceLabel}`}>
        <label>Source Chain :</label>
        <div className={style.sendSec__sendSwapbtn}>
          <button
            onClick={activeSend}
            className={`${style.sendSec__sendSwapbtn__buttons} 
              ${
                activeTab === "native" &&
                style.sendSec__sendSwapbtn__buttons__active
              }
            `}
          >
            Native
          </button>
          <button
            onClick={activeSwap}
            className={`${style.sendSec__sendSwapbtn__buttons}  ${
              activeTab === "evm" && style.sendSec__sendSwapbtn__buttons__active
            }`}
          >
            EVM
          </button>
        </div>
      </div>
      <div className={style.sendSec__inputInnerSec}>
        <InputFieldOnly
          placeholder={"Please enter recipient address"}
          placeholderBaseColor={true}
          coloredBg={true}
        />
        <div>
          <InputField
            placeholder={"Wallet Address"}
            addonAfter={
              <span className={style.sendSec__pasteText}>
                <img src={WalletCardLogo} />
                5ire
              </span>
            }
          />
          <span className={style.sendSec__spanbalanceText}>
            Balance 00.0000 5IRE
          </span>
        </div>
        <InputFieldOnly
          placeholder={"Memo (Optional)"}
          placeholderBaseColor={true}
          coloredBg={true}
        />
      </div>
      <div className={style.sendSec__transactionFee}>
        <p>Transaction Fee : 0.0002 5IRE</p>
      </div>
    </div>
    <Approve/>
    </>
  );
}

export default Send;
