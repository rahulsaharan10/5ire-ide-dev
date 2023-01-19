import React from "react";
import MenuRestofHeaders from "../BalanceDetails/MenuRestofHeaders/MenuRestofHeaders.jsx";
import { InputFieldOnly } from "../InputField/InputFieldSimple.jsx";
import CopyIcon from "../../Assets/CopyIcon.svg";
import style from "./style.module.scss";
import ButtonComp from "../ButtonComp/ButtonComp.jsx";
import Exportprivate from "../../Assets/PNG/exportprivate.png";
import { useNavigate } from "react-router-dom";

function ManageWallet() {
    const navigate = useNavigate();
  return (
    <>
      <div className={`scrollableCont`}>
        <MenuRestofHeaders backTo={"/"} title={"Manage Wallet"} />
        <div className={`flexedContent`}>
          <InputFieldOnly
            placeholder={"Type Wallet Name"}
            placeholderBaseColor={true}
            coloredBg={true}
            label="Wallet Name:"
          />
          <div className={style.wallet}>
            <div className={style.wallet__addressInput}>
              <label>Native Chain Address:</label>
              <p className={style.wallet__addressInput__copyText}>
                <span>5FWJXakbsYfB2Gskr1AQvTd......nFaeRP5y</span>
                <img src={CopyIcon} />{" "}
              </p>
            </div>
          </div>
          <div className={style.wallet}>
            <div className={style.wallet__addressInput}>
              <label>Native Chain Address:</label>
              <p className={style.wallet__addressInput__copyText}>
                <span>5FWJXakbsYfB2Gskr1AQvTd......nFaeRP5y</span>
                <img src={CopyIcon} />{" "}
              </p>
            </div>
          </div>
          <div className={style.btn_icon}>
                      <ButtonComp
                           onClick={() => navigate("/enter-password")}
              text="Export Private Key"
              img={Exportprivate}
            ></ButtonComp>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageWallet;
