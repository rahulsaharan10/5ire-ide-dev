import React from "react";
import { useNavigate } from "react-router-dom";
import MenuRestofHeaders from "../../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import ButtonComp from "../../../Components/ButtonComp/ButtonComp";
import style from "./style.module.scss";

function SendConfirm() {
    const navigate = useNavigate()
  const data = [
    {
      text: "From",
      textVal: "2ertgbmjbgbnddfnvdfmnd",
    },
    {
      text: "To",
      textVal: "@erypgtjgdfnldflfvns",
    },
    {
      text: "Network Fee",
      textVal: " 0.00001 ETH/ $0.0082",
    },
    {
      text: "Total value",
      textVal: "$0.03455",
    },
  ];
  return (
    <div className={`scrollableCont`}>
      <MenuRestofHeaders
        backTo={"/send"}
        title={"Send BTC"}
        settingTo={"/setting"}
      />
      <div className={`flexedContent`}>
        <div className={style.confirmCurrency}>
          <div className={style.confirmCurrency__card}>
            <h3 className={style.confirmCurrency__card__textTop}>0.0001 ETH</h3>
            <p className={style.confirmCurrency__card__textBtm}>$0.0082</p>
          </div>
          <div className={style.confirmCurrency__keyValuesOuter}>
          {data.map((ele) => (
            <div className={style.confirmCurrency__keyValues}>
              <div className={style.confirmCurrency__keyValues__key}>
                {ele.text}
              </div>
              <div className={style.confirmCurrency__keyValues__value}>
                {ele.textVal}
              </div>
            </div>
          ))}
          </div>
          <ButtonComp
            onClick={() => navigate('/send')}
          text={"Confirm"}
          maxWidth={"100%"}
        />
        </div>
      </div>
    </div>
  );
}

export default SendConfirm;
