import { Drawer } from "antd";
import React, { useState } from "react";
import BTC from "../../Assets/Coins/BTC.png";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import CoinsTable from "../../Components/CoinsTable/CoinsTable";
import style from "./style.module.scss";
import ModalCloseIcon from "../../Assets/ModalCloseIcon.svg";
import ArrowRightIcon from "../../Assets/ArrowRightIcon.svg";
import Mercuryo from "../../Assets/Coins/Mercuryo.png";
import Transak from "../../Assets/Coins/Transak.png";
import Alchemy from "../../Assets/Coins/Alchemy.png";
function Buy() {
  const drawerData = [
    {
      coinIcon: Mercuryo,
      coinName: "Mercuryo",
      coinPrice: "0.000456",
      coinSubName: "BTC",
      backArrow: ArrowRightIcon
    },
    {
        coinIcon: Transak,
        coinName: "Transak",
        coinPrice: "0.000456",
        coinSubName: "BTC",
        backArrow: ArrowRightIcon
      },
      {
        coinIcon: Alchemy,
        coinName: "Alchemy",
        coinPrice: "0.000456",
        coinSubName: "BTC",
        backArrow: ArrowRightIcon
      },
  ];
  const data = [
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      openModal: () => {
        setOpen(true);
      },
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
      routeTo: "sendCurrency",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
    },
    {
      coinIcon: BTC,
      coinName: "BTC",
      coinSubName: "Bitcoin",
      coinPrice: "28,752",
      coinStatus: "-0.90%",
      currCryptoBal: "0 BTC",
      currDollerBal: "0.00",
    },
  ];
  const [currData, setCurrData] = useState(data);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={`scrollableCont`}>
      <MenuRestofHeaders backTo={"/wallet"} title={"Buy"} />
      <div className={`flexedContent`}>
        <CoinsTable dataArray={currData} />
      </div>
      <Drawer
        title="Third Party Provider"
        placement="bottom"
        onClose={onClose}
        open={open}
        closeIcon={<img src={ModalCloseIcon} />}
      >
      {drawerData.map((ele, index)=><div className={style.swapDrawer}>
          <div key={index} className={style.swapDrawer__left}>
            <img src={ele.coinIcon} width={30} height={30} />
            <div className={style.swapDrawer__left__texts}>
            <div className={style.swapDrawer__left__textsTop}>{ele.coinName}</div>
            <div className={style.swapDrawer__left__textsBottom}>{ele.coinPrice} <span>{ele.coinSubName}</span></div>
            </div>
          </div>
          <div className={style.swapDrawer__right}>
            <img src={ele.backArrow} width={8} height={15} />
          </div>
        </div>)}
      </Drawer>
    </div>
  );
}

export default Buy;
