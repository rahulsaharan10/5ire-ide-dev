import React from 'react'
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
function ImportWallet() {
  return (
    <div className={style.cardWhite}>
    <MenuRestofHeaders logosilver={true} title="5ire Non-Custodial Wallet" />
    <div className={style.cardWhite__cardInner}>
      <div className={style.cardWhite__cardInner__innercontact}>
        <h1>Import Account</h1>
      </div>
      <div className={style.cardWhite__linkOuter}>
        <InputFieldOnly
          placeholder={"Enter your mneomonics phrase"}
          placeholderBaseColor={true}
          coloredBg={true}
        />
      </div>
      <div className={style.setPassword__footerbuttons}>
        <ButtonComp
          text={"Wallet Now"}
        />
      </div>
    </div>
  </div>
  )
}

export default ImportWallet