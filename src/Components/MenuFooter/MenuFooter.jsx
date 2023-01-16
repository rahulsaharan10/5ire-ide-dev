import React, { useState } from "react";
import style from "./style.module.scss";
import WalletIcon from "../../Assets/WalletIcon.svg";
import DefiIcon from "../../Assets/DefiIcon.svg";
import SettignIcon from "../../Assets/SettignIcon.svg";
import HistoryIcon from "../../Assets/HistoryIcon.svg";
import { Link, Navigate, useLocation } from "react-router-dom";
import ButtonComp from "../ButtonComp/ButtonComp";
import { Drawer } from "antd";
import FooterStepOne, {
  FooterStepThree,
  FooterStepTwo,
} from "./FooterContinue";
import Sendhistry from "../../Assets/sendhistry.svg";
import TransectionHistry from "../TransectionHistry/TransectionHistry";
import ModalCloseIcon from "../../Assets/ModalCloseIcon.svg";
import ManageCustom from "../ManageCustomtocken/ManageCustom";
function MenuFooter() {
  // const [activeLink, setactiveLink] = useState("wallet");
  const getLocation = useLocation();
  const path = getLocation.pathname.replace("/", "");

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const data = [
    {
      timing: " Aug 24 2022 | 11:30 AM",
      swap: "Swap",
      recievedSend: "Native to EVM",
      status5ire: "50 5ire",
      status: "Panding",
      img: Sendhistry,
    },

    {
      timing: " Aug 24 2022 | 11:30 AM",
      swap: "Received",
      recievedSend: "To : 326xxxSFFss....990",
      status5ire: "50 5ire",
      status: "Panding",
      img: Sendhistry,
    },
    {
      timing: " Aug 24 2022 | 11:30 AM",
      swap: "Sent",
      recievedSend: "To : 326xxxSFFss....990",
      status5ire: "50 5ire",
      status: "Panding",
      img: Sendhistry,
    },
    {
      timing: " Aug 24 2022 | 11:30 AM",
      swap: "Swap",
      recievedSend: "Native to EVM",
      status5ire: "50 5ire",
      status: "Panding",
      img: Sendhistry,
    },
  ];
  const edited = false;

  return (
    <div className={`${style.menuItems} welcomeFooter`}>
      {path === "wallet" && (
        <Link
          to="/wallet"
          // onClick={() => setactiveLink("wallet")}
          className={`${style.menuItems__items} ${
            path === "wallet" ? style.menuItems__items__active : ""
          }`}
        >
          <div className={style.menuItems__items__img}>
            <img src={WalletIcon} />
          </div>
          <span className={style.menuItems__items__title}>Wallet</span>
        </Link>
      )}
      {path === "wallet" && (
        <Link
          onClick={() => setOpen(true)}
          className={`${style.menuItems__items} ${
            path === "history" ? style.menuItems__items__active : ""
          }`}
        >
          <div className={style.menuItems__items__img}>
            <img src={HistoryIcon} />
          </div>
          <span className={style.menuItems__items__title}>History</span>
        </Link>
      )}
      <Drawer
        title={
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            Transaction History
          </span>
        }
        placement="bottom"
        onClose={onClose}
        open={open}
        // closeIcon={<img src={ModalCloseIcon} />}
      >
        {data.map((data) => (
          <TransectionHistry
            timing={data.timing}
            swap={data.swap}
            recievedSend={data.recievedSend}
            status5ire={data.status5ire}
            status={data.status}
            img={data.img}
          />
        ))}
      </Drawer>

      {path === "wallet" && (
        <Link
          // to="/setting"
          onClick={() => setOpen(true)}
          className={`${style.menuItems__items} ${
            path === "setting" ? style.menuItems__items__active : ""
          }`}
        >
          <div className={style.menuItems__items__img}>
            <img src={SettignIcon} />
          </div>
          <span className={style.menuItems__items__title}>My Accounts</span>
        </Link>
      )}
      <Drawer
        title={
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            My Accounts
          </span>
        }
        placement="bottom"
        onClose={onClose}
        open={open}
        closeIcon={<img src={ModalCloseIcon} />}
      >
        {data.map((data) => (
          <ManageCustom
            name={data.name}
            currency={data.currency}
            img={data.img}
            valuecurrency={data.valuecurrency}
            edited={false}
          />
        ))}
      </Drawer>
      {path === "" ||
        (path === "createNewWallet" && (
          <div className={style.menuItems__needHelp}>
            <p>
              Need help? Contact <a>Support</a>
            </p>
          </div>
        ))}
      {path === "beforebegin" && <FooterStepOne />}
      {path === "createwalletchain" && <FooterStepTwo />}
      {path === "setPassword" && <FooterStepThree />}
    </div>
  );
}

export default MenuFooter;
