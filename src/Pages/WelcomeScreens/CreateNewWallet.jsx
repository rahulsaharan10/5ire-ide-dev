import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";

function CreateNewWallet() {
  const navigate = useNavigate();
  return (
    <div className={style.cardWhite}>
      <h2 className={style.cardWhite__title}>Wallet Name</h2>
      <p className={style.cardWhite__subTitle} style={{ marginBottom: 24 }}>
        You can simply identify multiple wallets and label your own wallet.
      </p>
      <div className={style.cardWhite__linkOuter}>
        <InputFieldOnly
          placeholder={"Wallet #01"}
          label="Enter Name"
          placeholderBaseColor={true}
          coloredBg={true}
        />
        <div className={style.textInfoBaseColor}>Max Limit: 25/25</div>
      </div>
      <div className={style.setPassword__footerbuttons}>
        <ButtonComp
          onClick={() => navigate("/")}
          text={"Back"}
          bordered={true}
        />
        <ButtonComp
          onClick={() => navigate("/setPassword")}
          text={"Proceed"}
        />
      </div>
    </div>
  );
}

export default CreateNewWallet;
