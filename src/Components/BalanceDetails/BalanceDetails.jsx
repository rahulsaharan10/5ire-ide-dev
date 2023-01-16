import React, { useState } from "react";
import style from "./style.module.scss";
import SendIcon from "../../Assets/SendIcon.svg";
import RecieveIcon from "../../Assets/RecieveIcon.svg";
import BuyIcon from "../../Assets/BuyIcon.svg";
import SwapIcon from "../../Assets/SwapIcon.svg";
import { Link, useLocation } from "react-router-dom";
import DarkLogo from "../../Assets/DarkLogo.svg";
import GreenCircle from "../../Assets/greencircle.svg";
import DownArrowSuffix from "../../Assets/DownArrowSuffix.svg";
import ModalCustom from "../ModalCustom/ModalCustom";
import BTCicon from "../../Assets/Coins/BTC.png";
import ScannerImg from "../../Assets/PNG/ScannerImg.png";
import CopyIconBlue from "../../Assets/CopyIconBlue.svg";
import SendIconWhite from "../../Assets/SendIconWhite.svg";
import RecieveIconWhite from "../../Assets/RecieveIconWhite.svg";
import BuyIconWhite from "../../Assets/BuyIconWhite.svg";
import SwapIconWhite from "../../Assets/SwapIconWhite.svg";
import { Dropdown, Select } from "antd";
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

  return (
    <div className={`${style.balanceDetails} ${mt0 ? mt0 : ""}`}>
      <div
        className={
          path !== "currencyDetails"
            ? style.balanceDetails__decoratedSec
            : style.balanceDetails__cardCurrencyDetails
        }
      >
        {path !== "currencyDetails" ? (
          <>
            <img src={DarkLogo} />
            <div className={style.balanceDetails__accountName}>
              <p>
                <img src={GreenCircle} />
                Account Name
              </p>
              <span>0x0a....12sd</span>
            </div>
            <div className={style.balanceDetails__dropdownStyle}>
              <Select
                suffixIcon={<img src={DownArrowSuffix} />}
                defaultValue={[
                  {
                    value: <span className="flexedItemSelect">Network</span>,
                  },
                ]}
                style={{
                  width: 100,
                }}
                options={[
                  {
                    value: "BTC",
                    label: <span className="flexedItemSelect">BTC</span>,
                  },
                ]}
              />
            </div>
          </>
        ) : null}

        {/* {path !== "currencyDetails" ? (
          <Link to="/add-token" className={style.balanceDetails__addTokensBTn}>
            <img src={PlusBordredIcon} width={20} height={20} />
            <span>Add Tokens</span>
          </Link>
        ) : null} */}
      </div>
      <div
        className={`${style.balanceDetails__itemsOuter} ${
          className ? className : ""
        }`}
      >
        <Link
          to="/send"
          className={
            path === "currencyDetails"
              ? style.balanceDetails__items__whiteText
              : style.balanceDetails__items
          }
        >
          <div className={style.balanceDetails__items__img}>
            {path === "currencyDetails" ? (
              <img src={SendIconWhite} height={24} width={24} />
            ) : (
              <img src={SendIcon} height={24} width={24} />
            )}
          </div>
          <span>Send</span>
        </Link>
        <Link
          onClick={showModal}
          to="#"
          className={
            path === "currencyDetails"
              ? style.balanceDetails__items__whiteText
              : style.balanceDetails__items
          }
        >
          <div className={style.balanceDetails__items__img}>
            {path === "currencyDetails" ? (
              <img src={RecieveIconWhite} height={24} width={24} />
            ) : (
              <img src={RecieveIcon} height={24} width={24} />
            )}
          </div>
          <span>Receive</span>
        </Link>
        <Link
          to="/buy"
          className={
            path === "currencyDetails"
              ? style.balanceDetails__items__whiteText
              : style.balanceDetails__items
          }
        >
          <div className={style.balanceDetails__items__img}>
            {path === "currencyDetails" ? (
              <img src={BuyIconWhite} height={24} width={24} />
            ) : (
              <img src={BuyIcon} height={24} width={24} />
            )}
          </div>
          <span>Buy</span>
        </Link>
        <Link
          to="/swap"
          className={
            path === "currencyDetails"
              ? style.balanceDetails__items__whiteText
              : style.balanceDetails__items
          }
        >
          <div className={style.balanceDetails__items__img}>
            {path === "currencyDetails" ? (
              <img src={SwapIconWhite} height={24} width={24} />
            ) : (
              <img src={SwapIcon} height={24} width={24} />
            )}
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
