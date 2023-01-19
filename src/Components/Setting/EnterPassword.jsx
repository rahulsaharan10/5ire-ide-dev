import React from "react";
import MenuRestofHeaders from "../BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import { InputFieldOnly } from "../InputField/InputFieldSimple.jsx";
import ButtonComp from "../ButtonComp/ButtonComp";
import { Navigate } from "react-router-dom";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
function EnterPassword() {
    const navigate = useNavigate();
  return (
    <>
      <div className={`scrollableCont`}>
        <MenuRestofHeaders backTo={"/manage-wallet"} title={""} />
        <div className={`flexedContent`}>
          <div className={style.enterPassword}>
            <div className={style.commonHeadeing}>
              <h1>Enter Password</h1>
              <p>
                Your password is used to unlock your wallet and will allow
                wallet to export your Private Key
              </p>
            </div>
            <InputFieldOnly
              placeholder={"Enter Password"}
              placeholderBaseColor={true}
              coloredBg={true}
              // label="Wallet Name:"
            />
            <div>
              <ButtonComp
                onClick={() => navigate("/private-key")}
                text="Continue"
              ></ButtonComp>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnterPassword;
