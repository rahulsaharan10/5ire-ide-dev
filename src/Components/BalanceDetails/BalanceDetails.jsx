import React, { useState } from "react";
import style from "./style.module.scss";
import SendIcon from "../../Assets/SendIcon.svg";
import RecieveIcon from "../../Assets/RecieveIcon.svg";
import BuyIcon from "../../Assets/BuyIcon.svg";
import SwapIcon from "../../Assets/SwapIcon.svg";
import { Link, useLocation } from "react-router-dom";
import ModalCustom from "../ModalCustom/ModalCustom";
import BTCicon from "../../Assets/Coins/BTC.png";
import ScannerImg from "../../Assets/PNG/ScannerImg.png";
import CopyIconBlue from "../../Assets/CopyIconBlue.svg";
import JustLogo from "../../Assets/JustLogo.svg";
import InfoIcon from "../../Assets/InfoIcon.svg";
import PlusBordredIcon from "../../Assets/PlusBordredIcon.svg";
import SendIconWhite from '../../Assets/SendIconWhite.svg'
import RecieveIconWhite from '../../Assets/RecieveIconWhite.svg'
import BuyIconWhite from '../../Assets/BuyIconWhite.svg'
import SwapIconWhite from '../../Assets/SwapIconWhite.svg'
import { Dropdown } from "antd";
function BalanceDetails({ className, textLeft, mt0 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getLocation = useLocation();
  const path = getLocation.pathname.replace("/", "");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items = [
    {
      label: <Link to="/editWalletName">Edit</Link>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <Link to="/showSecretPhrase">Show Secret Pharse</Link>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <Link to="/currencyPreference">Set Currency</Link>,
      key: "2",
    },
  ];
  return (
    <div className={`${style.balanceDetails} ${mt0 ? mt0 : ""}`}>
      <div className={path !== "currencyDetails" ? style.balanceDetails__decoratedSec :style.balanceDetails__cardCurrencyDetails}>
        {path !== "currencyDetails" ? (
          <>
            {" "}
            <img src={JustLogo} width={25} height={20} />
            <div className={style.balanceDetails__dropdownStyle}>
              <p>Main Wallet #1</p>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Link onClick={(e) => e.preventDefault()}>
                  <img src={InfoIcon} />
                </Link>
              </Dropdown>
            </div>
          </>
        ) : null}

        <h3
          className={`${style.balanceDetails__title} ${
            textLeft ? textLeft : ""
          }`}
        >
          $2,385.60
        </h3>
        {path !== "currencyDetails" ? (
          <Link to="/add-token" className={style.balanceDetails__addTokensBTn}>
            <img src={PlusBordredIcon} width={20} height={20} />
            <span>Add Tokens</span>
          </Link>
        ) : null}
      </div>
      <div
        className={`${style.balanceDetails__itemsOuter} ${
          className ? className : ""
        }`}
      >
        <Link to="/send"  className={path === "currencyDetails" ? style.balanceDetails__items__whiteText : style.balanceDetails__items}>
          <div className={style.balanceDetails__items__img}>
          {path === "currencyDetails" ?  <img src={SendIconWhite} height={24} width={24} /> : <img src={SendIcon} height={24} width={24} />}
          </div>
          <span>Send</span>
        </Link>
        <Link
          onClick={showModal}
          to="#"
          className={path === "currencyDetails" ? style.balanceDetails__items__whiteText : style.balanceDetails__items}
        >
          <div className={style.balanceDetails__items__img}>
          {path === "currencyDetails" ?  <img src={RecieveIconWhite} height={24} width={24} /> : <img src={RecieveIcon} height={24} width={24} />}
          </div>
          <span>Receive</span>
        </Link>
        <Link to="/buy" className={path === "currencyDetails" ? style.balanceDetails__items__whiteText : style.balanceDetails__items}>
          <div className={style.balanceDetails__items__img}>
            {path === "currencyDetails" ?  <img src={BuyIconWhite} height={24} width={24} /> : <img src={BuyIcon} height={24} width={24} />}
          </div>
          <span>Buy</span>
        </Link>
        <Link to="/swap" className={path === "currencyDetails" ? style.balanceDetails__items__whiteText : style.balanceDetails__items}>
          <div className={style.balanceDetails__items__img}>
            {path === "currencyDetails" ?  <img src={SwapIconWhite} height={24} width={24} /> : <img src={SwapIcon} height={24} width={24} />}
          </div>
          <span>Swap</span>
        </Link>
      </div>
      <ModalCustom
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <div className={style.balanceDetails__modal}>
          <div>
            <img src={BTCicon} width={46} height={46} />
          </div>
          <p className={style.balanceDetails__modal__title}>Receive BTC</p>
          <div className={style.balanceDetails__modal__scanner}>
            <img src={ScannerImg} />
          </div>
          <div className={style.balanceDetails__modal__wrapedText}>
            <img src={CopyIconBlue} width={15} height={16} />
            <span>Ox3fe....92D92cb</span>
          </div>
        </div>
      </ModalCustom>
    </div>
  );
}

export default BalanceDetails;
