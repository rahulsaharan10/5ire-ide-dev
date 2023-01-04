import { Select } from "antd";
import React from "react";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import { InputField } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
import BTC from "../../Assets/Coins/BTC.png";
import DownArrowSuffix from "../../Assets/DownArrowSuffix.svg";
import ETH from "../../Assets/Coins/ETH.png";
import ADA from "../../Assets/Coins/ADA.png";
import SwapVerticalIcon from "../../Assets/SwapVerticalIcon.svg";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { useNavigate } from "react-router-dom";
function Swap() {
  const navigate = useNavigate();
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
  const selectAfterTo = (
    <div className={"addonAfter"}>
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
          <div className={style.swap__icon}>
            <img src={SwapVerticalIcon} width={44} height={44} />
          </div>
          <InputField
            mb0={true}
            inputSelect={true}
            placeholder={"283.00"}
            label="To"
            addonAfter={selectAfterTo}
          />
          <div style={{ marginTop: "50px" }}>
            <ButtonComp
              onClick={() => navigate("/swapDetails")}
              text={"Swap"}
              maxWidth={"100%"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
