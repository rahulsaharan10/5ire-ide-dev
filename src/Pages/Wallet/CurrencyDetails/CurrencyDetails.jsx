import React, { useState } from "react";
import MenuRestofHeaders from "../../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import style from "./style.module.scss";
import BTC from "../../../Assets/Coins/BTC.png";
import BalanceDetails from "../../../Components/BalanceDetails/BalanceDetails";
import Lottie from "react-lottie-player";
import History from "../../../Assets/JsonFiles/History.json";
import HistryList from "../../../Components/HistryList/HistryList";
import Sendhistry from "../../../Assets/sendhistry.svg";
import FilterIcon from '../../../Assets/FillterBasicIcon.svg'
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import ModalCloseIcon from "../../../Assets/ModalCloseIcon.svg";
import StockMarket from '../../../Assets/PNG/StockMarket.png'
function CurrencyDetails() {
  const data = [
    {
      TickIcon: Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon: Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon: Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon: Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon: Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon: Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon: Sendhistry,

      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon: Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
  ];
  const [dataRender, setDataRender] = useState(true);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={`scrollableCont`}>
      <MenuRestofHeaders
        backTo={"/wallet"}
        chartIcon={()=>setOpen(true)}
        title={
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={BTC} />
            BTC
          </span>
        }
      />
       <Drawer
        title={<span style={{display:'flex', alignItems:"center", gap:"8px"}}>  <img src={BTC} width={30} height={30} />BTC</span>}
        placement="bottom"
        onClose={onClose}
        open={open}
        closeIcon={<img src={ModalCloseIcon} />}
      >
     <div>
      <img src={StockMarket} />
     </div>
      </Drawer>
      <div className={`flexedContent`}>
        <div className={style.currDetails}>
          <div className={style.currDetails__card}>
            <div className={style.currDetails__card__topTexts}>
              <p className={style.currDetails__card__text}>BEP20</p>
              <p className={style.currDetails__card__text}>$0.99976 +0.01%</p>
            </div>
            <BalanceDetails
              mt0={style.currDetails__card__mt0}
              className={style.currDetails__card__paddingOverride}
              textLeft={style.currDetails__card__textLeft}
            />
          </div>

          {dataRender ? (
            <div className={style.currDetails__dataSec}>
              <div className={style.currDetails__dataSec__header}>
                <p>Tokens</p>
               <Link to="#"> <img src={FilterIcon} width={12} height={16} /></Link>
              </div>
              <div className={style.currDetails__dataSec__table}>
                {data.map((data) => (
                  <HistryList
                    sendRecieve={data.sendRecieve}
                    coinname={data.coinname}
                    address={data.address}
                    valueCurrency={data.valueCurrency}
                    dollercurrency={data.dollercurrency}
                    addressTo={data.addressTo}
                    TickIcon={data.TickIcon}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className={style.currDetails__border}></div>
              <div className={style.currDetails__card}>
                <div className={style.currDetails__jsonFile}>
                  <Lottie
                    animationData={History}
                    style={{ width: 110, height: 110 }}
                    loop
                    play
                  />
                </div>
                <p className={style.currDetails__noData}>No send history</p>
              </div>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrencyDetails;
