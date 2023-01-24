import React from "react";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
import PlaceLogo from "../../Assets/PlaceLog.svg";
import { Link } from "react-router-dom";
function UnlockWelcome() {
  return (
    <div className={style.cardWhite}>
      <MenuRestofHeaders logosilver={true} title="5ire Non-Custodial Wallet" />
      <div className={style.cardWhite__cardInner}>
        <div className={style.cardWhite__cardInner__centerLogo}>
          <div className={style.cardWhite__cardInner__innerLogocontact}>
            <img src={PlaceLogo} />
            <div className={style.cardWhite__cardInner__innercontact}>
              <h1>Welcome Back!</h1>
              <span>The decentralized web awaits</span>
            </div>
          </div>
        </div>
        <div className={style.cardWhite__linkOuter}>
          <InputFieldOnly
            
            placeholder={"Enter Password"}
            placeholderBaseColor={true}
            coloredBg={true}
          />
        </div>
        <div className={style.setPassword__footerbuttons}>
          <ButtonComp
            // onClick={() => navigate("")}
            text={"Unlock"}
          />
        </div>
        <div className={style.forgotLink}>
          <Link to="">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}

export default UnlockWelcome;
