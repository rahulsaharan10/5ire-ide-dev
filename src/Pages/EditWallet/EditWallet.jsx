import React from "react";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import CreateNewWallet from "../WelcomeScreens/CreateNewWallet";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
function EditWallet() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={`scrollableCont`}>
        <MenuRestofHeaders backTo={"/wallet"} title={"Edit"} />
        <div className={`flexedContent`}>
          <div className={style.editWallet}>
            <h2 className={style.editWallet__title}>Wallet Name</h2>
            <p
              className={style.editWallet__subTitle}
              style={{ marginBottom: 24 }}
            >
              You can simply identify multiple wallets and label your own
              wallet.
            </p>
            <div className={style.editWallet__linkOuter}>
              <InputFieldOnly
                placeholder={"Wallet #01"}
                label="Enter Name"
                placeholderBaseColor={true}
                // coloredBg={true}
              />
              <div className={style.textInfoBaseColor}>Max Limit: 25/25</div>
            </div>
            <div className={style.setPassword__footerbuttons}>
              <ButtonComp
                onClick={() => navigate("/wallet")}
                text={"Continue"}
                maxWidth="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditWallet;
