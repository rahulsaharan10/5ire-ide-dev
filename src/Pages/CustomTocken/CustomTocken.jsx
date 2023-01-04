import React from "react";
import { Select } from "antd";
import BTC from "../../Assets/Coins/BTC.png";
import DownArrowSuffix from "../../Assets/DownArrowSuffix.svg";
import ETH from "../../Assets/Coins/ETH.png";
import ADA from "../../Assets/Coins/ADA.png";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import style from "./style.module.scss";
import { InputField } from "../../Components/InputField/InputFieldSimple";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple.jsx";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { Link } from "react-router-dom";
import ScannerImg from '../../Assets/scanner.svg'
function CustomTocken() {
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
      <MenuRestofHeaders
        FilterIcon
        backTo={"/manage"}
        title={"Add Custom Token"}
      />
      <div className={`flexedContent`}>
        <div className={style.token}>
          <InputField
            mb0={false}
            inputSelect={true}
            placeholder={"Select Network"}
            label="Select Network"
            addonAfter={selectAfterTo}
          />
          <InputField
            placeholder="Contract address"
            label="Enter Contract Address"
            addonAfter={<div className={style.token__selectStyle}><span className={style.token__selectStyle__img}><img src={ScannerImg} width={18} height={18} /></span><span className={style.token__pasteText}>Paste</span></div>}
          />
          <InputFieldOnly label="Enter Token Name" placeholder="password" />

          <div className={style.token__symbol_dec}>
            <InputFieldOnly label="Symbol" placeholder="Symbol" />
            <InputFieldOnly label="Decimal" placeholder="Decimal" />
          </div>
          <Link to="/manage">
            {" "}
            <ButtonComp text={"Add Token"} maxWidth={"100%"} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CustomTocken;
