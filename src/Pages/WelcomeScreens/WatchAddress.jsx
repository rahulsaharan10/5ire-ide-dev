import React from "react";
import style from "./style.module.scss";
import {
  InputField,
  InputFieldOnly,
} from "../../Components/InputField/InputFieldSimple";
import ScannerImg from "../../Assets/scanner.svg";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WatchAddress() {
  const [activeTab, setActiveTab] = useState("setPassword");
  const navigate = useNavigate();

  return (
    <div>
      <div className={style.cardWhite}>
        <h2 className={style.cardWhite__title}>Address</h2>
        <p
          className={style.cardWhite__subTitle}
          style={{ margin: "0 auto 24px", maxWidth: 325 }}
        >
          Public address can be view without revealing its private key. You can
          view balances and transactions with this, but you cannot send
          transactions.
        </p>
        <div className={style.cardWhite__linkOuter}>
          <div className={style.token}>
            <div className={style.token__fields}>
              <InputFieldOnly
                placeholderBaseColor={true}
                label="Wallet Name"
                placeholder="Enter wallet name"
              />

              <InputField
                placeholderBaseColor={true}
                placeholder="Address"
                label="Address"
                coloredBg={true}
                addonAfter={
                  <div className={style.token__selectStyle}>
                    <span className={style.token__selectStyle__img}>
                      <img src={ScannerImg} width={18} height={18} />
                    </span>
                    <span className={style.token__pasteText}>Paste</span>
                  </div>
                }
              />
              <div className={style.setPassword__footerbuttons}>
                <ButtonComp
                  onClick={() => navigate("/watch-list")}
                  text={"Back"}
                  bordered={true}
                />
                <ButtonComp
                  onClick={() => navigate("/setPassword")}
                  // onClick={() => setActiveTab("/")}
                  text={"Proceed"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchAddress;
