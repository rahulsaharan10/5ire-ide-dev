import React, { useState } from "react";
import style from "./style.module.scss";
import SendIcon from "../../Assets/SendIcon.svg";
import RecieveIcon from "../../Assets/RecieveIcon.svg";
import BuyIcon from "../../Assets/BuyIcon.svg";
import SwapIcon from "../../Assets/SwapIcon.svg";
import { Link } from "react-router-dom";
import ModalCustom from "../ModalCustom/ModalCustom";
import BTCicon from "../../Assets/Coins/BTC.png";
import ScannerImg from "../../Assets/PNG/ScannerImg.png";
import CopyIconBlue from "../../Assets/CopyIconBlue.svg";
function BalanceDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className={style.balanceDetails}>
      <h3 className={style.balanceDetails__title}>$2,385.60</h3>
      <div className={style.balanceDetails__itemsOuter}>
        <Link to="send" className={style.balanceDetails__items}>
          <div className={style.balanceDetails__items__img}>
            <img src={SendIcon} height={24} width={24} />
          </div>
          <span>Send</span>
        </Link>
        <Link
          onClick={showModal}
          to="#"
          className={style.balanceDetails__items}
        >
          <div className={style.balanceDetails__items__img}>
            <img src={RecieveIcon} height={24} width={24} />
          </div>
          <span>Receive</span>
        </Link>
        <Link to="" className={style.balanceDetails__items}>
          <div className={style.balanceDetails__items__img}>
            <img src={BuyIcon} height={24} width={24} />
          </div>
          <span>Buy</span>
        </Link>
        <Link to="" className={style.balanceDetails__items}>
          <div className={style.balanceDetails__items__img}>
            <img src={SwapIcon} height={24} width={24} />
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
