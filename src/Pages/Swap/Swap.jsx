import { Select } from "antd";
import React from "react";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import { InputField } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
import BTC from "../../Assets/Coins/BTC.png";
import DownArrowSuffix from "../../Assets/DownArrowSuffix.svg";
import ETH from "../../Assets/Coins/ETH.png";
import ADA from "../../Assets/Coins/ADA.png";
function Swap() {
  const selectAfter = (
    <div className={"addonAfter"}>
      <span className={style.swap__pasteText}>Max</span>
      <Select
        suffixIcon={<img src={DownArrowSuffix} />}
        defaultValue={[
          {
            value: (
              <span className="flexedItemSelect">
                <img src={BTC} />
                BTC
              </span>
            ),
          },
        ]}
        style={{
          width: 100,
        }}
        options={[
          {
            value: "BTC",
            label: (
              <span className="flexedItemSelect">
                <img src={BTC} />
                BTC
              </span>
            ),
          },
          {
            value: "ETH",
            label: (
              <span className="flexedItemSelect">
                <img src={ETH} />
                ETH
              </span>
            ),
          },
          {
            value: "ADA",
            label: (
              <span className="flexedItemSelect">
                <img src={ADA} />
                BTC
              </span>
            ),
          },
        ]}
      />
    </div>
  );
  return (
    <div className={`scrollableCont`}>
      <MenuRestofHeaders backTo={"/wallet"} title={"Swap"} />
      <div className={`flexedContent`}>
        <div className={style.swap}>
          <InputField
            mb0={true}
            inputSelect={true}
            placeholder={"Wallet Address"}
            label="Address"
            addonAfter={selectAfter}
          />
          <div className={style.swap__infoText}>0 BTC ~ $88.02</div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
