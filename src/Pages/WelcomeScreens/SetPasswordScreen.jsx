import React, { useState } from "react";
import InputFieldSimple from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
import TickIcon from "../../Assets/TickIcon.svg";
import BorderedRoundIcon from "../../Assets/BorderedRoundIcon.svg";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { useNavigate } from "react-router-dom";
import SecretPhrase from "./SecretPhrase";
import ConfirmSecretPhrase from "./ConfirmSecretPhrase";
import CongratulationsScreen from "./CongratulationsScreen";

function SetPasswordScreen() {
  const [iconState, setIconState] = useState(false);
  const [activeTab, setActiveTab] = useState("setPassword");
  const navigate = useNavigate();
  const validations = [
    {
      text: "8 or more characters",
      icon: iconState ? BorderedRoundIcon : TickIcon,
    },
    {
      text: "At least one upper case character",
      icon: iconState ? BorderedRoundIcon : TickIcon,
    },
    {
      text: "At least one digit",
      icon: iconState ? BorderedRoundIcon : TickIcon,
    },
    {
      text: "At least one symbol",
      icon: iconState ? BorderedRoundIcon : TickIcon,
    },
  ];
  return (
    <div className={`${style.cardWhite} ${style.setPassword}`}>
      {activeTab !== "congrats" && (
        <div className={style.setPassword__tabs}>
          <div
            className={`${style.setPassword__tabs__itself} ${
              activeTab === "setPassword" &&
              style.setPassword__tabs__itself_active
            }`}
          ></div>
          <div
            className={`${style.setPassword__tabs__itself} ${
              activeTab === "secretPhrase" &&
              style.setPassword__tabs__itself_active
            }`}
          ></div>
          <div
            className={`${style.setPassword__tabs__itself} ${
              activeTab === "confirmSecretPhrase" &&
              style.setPassword__tabs__itself_active
            }`}
          ></div>
        </div>
      )}
      <h2 className={style.setPassword__title}>
        {" "}
        {activeTab === "setPassword"
          ? "Set a Password"
          : activeTab === "secretPhrase"
          ? "Your Secret Phrase"
          : activeTab === "confirmSecretPhrase"
          ? "Confirm Your Secret Phrase"
          : "Congratulations!"}
      </h2>
      {activeTab === "setPassword" && (
        <>
          <InputFieldSimple placeholder={"Password"} />
          <div className={style.setPassword__validations}>
            {validations.map((ele, index) => (
              <p key={index}>
                <img src={ele.icon} />
                {ele.text}
              </p>
            ))}
          </div>
          <InputFieldSimple placeholder={"Confirm Password"} />
          <div className={style.setPassword__footerbuttons}>
            <ButtonComp
              onClick={() => navigate("/")}
              text={"Back"}
              bordered={true}
            />
            <ButtonComp
              onClick={() => setActiveTab("secretPhrase")}
              text={"Proceed"}
            />
          </div>
        </>
      )}
      {activeTab === "secretPhrase" && (
        <SecretPhrase>
           <div className={style.setPassword__footerbuttons}>
          <ButtonComp
            onClick={() => setActiveTab("setPassword")}
            text={"Back"}
            bordered={true}
          />
          <ButtonComp
            onClick={() => setActiveTab("confirmSecretPhrase")}
            text={"Proceed"}
          />
          </div>
        </SecretPhrase>
        
      )}
      {activeTab === "confirmSecretPhrase" && (
        <ConfirmSecretPhrase>
          <div className={style.setPassword__footerbuttons}>
          <ButtonComp
            onClick={() => setActiveTab("secretPhrase")}
            text={"Back"}
            bordered={true}
          />
          <ButtonComp
            onClick={() => setActiveTab("congrats")}
            text={"Proceed"}
          />
          </div>
        </ConfirmSecretPhrase>
      )}
      {activeTab === "congrats" && (
        <CongratulationsScreen>
          <ButtonComp onClick={() => navigate("/wallet")} text={"Open Wallet"} />
        </CongratulationsScreen>
      )}
    </div>
  );
}

export default SetPasswordScreen;
