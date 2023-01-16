import React from "react";
import {  useNavigate } from "react-router-dom";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";

function CreateNewWallet() {
  const navigate = useNavigate();
  return (
    <div className={style.cardWhite}>
      <MenuRestofHeaders logosilver={true} title="5ire Non-Custodial Wallet" />
      <div className={style.cardWhite__cardInner}>
        <div className={style.cardWhite__cardInner__innercontact}>
          <h1>Create New Wallet</h1>
          <p>The decentralized wallet</p>
        </div>
        <div className={style.cardWhite__linkOuter}>
          <InputFieldOnly
            placeholder={"Type Wallet Name"}
            placeholderBaseColor={true}
            coloredBg={true}
          />
        </div>
        <div className={style.setPassword__footerbuttons}>
          <ButtonComp
            onClick={() => navigate("/beforebegin")}
            text={"Create a new wallet"}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateNewWallet;
