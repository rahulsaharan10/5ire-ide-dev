import React from "react";
import style from "./style.module.scss";
import SendIcon from "../../Assets/SendIcon.svg";
import RecieveIcon from "../../Assets/RecieveIcon.svg";
import BuyIcon from "../../Assets/BuyIcon.svg";
import SwapIcon from "../../Assets/SwapIcon.svg";
import { Link } from "react-router-dom";
function BalanceDetails() {
  return (
    <div className={style.balanceDetails}>
      <h3 className={style.balanceDetails__title}>$2,385.60</h3>
      <div className={style.balanceDetails__itemsOuter}>
      <Link to="" className={style.balanceDetails__items}>
        <div className={style.balanceDetails__items__img}>
          <img src={SendIcon} height={24} width={24} />
        </div>
        <span>Send</span>
      </Link>
      <Link to="" className={style.balanceDetails__items}>
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
    </div>
  );
}

export default BalanceDetails;
