import React, { useState } from "react";
import style from "./style.module.scss";
import SwapIcon from "../../Assets/SwapIcon.svg";
import CopyIcon from "../../Assets/CopyIcon.svg";
import WalletCardLogo from "../../Assets/walletcardLogo.svg";
import { InputField } from "../../Components/InputField/InputFieldSimple";
import Approve from "../Approve/Approve";
import ModalCustom from "../../Components/ModalCustom/ModalCustom";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import ComplSwap from "../../Assets/tranCompl.svg";
import FaildSwap from "../../Assets/tranReject.svg"
function Swap() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFaildOpen, setIsFaildOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("one");
  const [toFrom,setToFrom] = useState({from:"native",to:"evm"});
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
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const swapfaild = () => {
    setIsFaildOpen(true);
  };
  const faildOk = () => {
    setIsFaildOpen(false);
  };
  const faildCancel = () => {
    setIsFaildOpen(false);
  };

  const handleClick = () => {
    
  }
  return (
    <>
      <div className={style.swap}>
        <div className={style.swap__swapCopy}>
          <div className={style.swap__swapSec}>
            <h3>From {toFrom.from}</h3>
            {/* <p>300 5ire</p> */}
            <span>
              0xxx0...lsh223 <img src={CopyIcon} width={11} height={11} />
            </span>
          </div>
          <div className={style.swap__icon}>
            <img src={SwapIcon} alt="swapIcon" onClick={handleClick} />
          </div>
          <div className={style.swap__swapSec}>
            <h3>To {toFrom.to}</h3>
            {/* <p>300 5ire</p> */}
            <span>
              0xx ...lsh223 <img src={CopyIcon} alt="copyIcon"width={11} height={11} />
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
              ${activeTab === "one" &&
                style.swap__activeBalanceSelect__buttons__active
                }
            `}
            >
              25 %
            </button>
            <button
              onClick={activeSecond}
              className={`${style.swap__activeBalanceSelect__buttons}  ${activeTab === "two" &&
                style.swap__activeBalanceSelect__buttons__active
                }`}
            >
              50 %
            </button>
            <button
              onClick={activeThree}
              className={`${style.swap__activeBalanceSelect__buttons}  ${activeTab === "three" &&
                style.swap__activeBalanceSelect__buttons__active
                }`}
            >
              70 %
            </button>
            <button
              onClick={activeFour}
              className={`${style.swap__activeBalanceSelect__buttons}  ${activeTab === "four" &&
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
      <Approve onClick={showModal} />
      <ModalCustom
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <div className="swapsendModel">
          <div className="innerContact">
            <img src={ComplSwap} />
            <h2 className="title">Swap Completed</h2>
            <p className="transId">Your Swapped Transaction ID</p>
            <span className="address">0ADX0SSD123211HJGT12641673653OL126416736GT12</span>

            <div className="footerbuttons">
              <ButtonComp text={"Swap Again"} onClick={swapfaild} />
            </div>
          </div>
        </div>
      </ModalCustom>
      <ModalCustom
        isModalOpen={isFaildOpen}
        handleOk={faildOk}
        handleCancel={faildCancel}
      >
        <div className="swapsendModel">
          <div className="innerContact">
            <img src={FaildSwap} />
            <h2 className="title">Swap Failed</h2>
            <p className="transId">Your Swap Failed</p>

            <div className="footerbuttons">
              <ButtonComp text={"Swap Again"} />
            </div>
          </div>
        </div>
      </ModalCustom>
    </>
  );
}

export default Swap;
