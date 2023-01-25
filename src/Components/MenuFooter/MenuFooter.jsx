import React, { useState } from "react";
import style from "./style.module.scss";
import Walletlogo from "../../Assets/PNG/walletlogo.png";
import DefiIcon from "../../Assets/DefiIcon.svg";
import SettignIcon from "../../Assets/SettignIcon.svg";
import Myaccount from "../../Assets/PNG/myaccount.png";
import HistoryIcon from "../../Assets/PNG/histry.png";
import { Link,useNavigate, useLocation } from "react-router-dom";
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
import AccountSetting from "../AccountSetting/AccountSetting.jsx";
import Createaccount from "../../Assets/PNG/createaccount.png";
import Logout from "../../Assets/PNG/logout.png";
import Import from "../../Assets/PNG/import.png";
import BackArrow from "../../Assets/PNG/arrowright.png";
import Wallet from "../../Assets/PNG/wallet.png";
import SocialAccount from "../SocialAccount/SocialAccount";
import Setting from "../../Assets/PNG/setting.png";
import { useSelector, useDispatch } from "react-redux"
import {setCurrentAcc, setLogin} from "../../Store/reducer/auth";
import useAuth from "../../Hooks/useAuth";
import {toast} from "react-toastify";

function MenuFooter() {
  // const [activeLink, setactiveLink] = useState("wallet");

  const navigate = useNavigate();
  const {logout} = useAuth(); 
  const { accounts } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const getLocation = useLocation();
  const path = getLocation.pathname.replace("/", "");
  const [accData, setAccData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const onClose1 = () => {
    setOpen1(false);
  };
  const onClose2 = () => {
    setOpen2(false);
  };
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

  const handleMyAccOpen = () => {
    setOpen(true);
    setAccData(accounts)
  }

  const hanldeCreateNewAcc = () => {
    console.log("Clicked cerateNew acc!!");
    navigate("/createNewWallet");
  };

  const handleImportAcc = () => {
    navigate("/importWallet");
    console.log("Clicked Import acc!!");
  };

  const handleLogout = async () => {
    console.log("Clicked Logout acc!!");
    const res =  await logout();
    console.log("Response : ",res);

    if (!res.error) {
      navigate("/unlockWallet")
    }else{
      toast.error("Error while logging out!");
    }
  }

  const onSelectAcc = (e) => {
    let accId = e.target.value;
    let acc = accounts[accId];
    console.log(acc);
    dispatch(setCurrentAcc(acc));
  }


  const edited = false;

  return (
    <div className={`${style.menuItems} welcomeFooter`}>
      {path === "wallet" && (
        <Link
          to="/wallet"
          // onClick={() => setactiveLink("wallet")}
          className={`${style.menuItems__items} ${path === "wallet" ? style.menuItems__items__active : ""
            }`}
        >
          <div className={style.menuItems__items__img}>
            <img src={Walletlogo} />
          </div>
          <span className={style.menuItems__items__title}>Wallet</span>
        </Link>
      )}
      {path === "wallet" && (
        <Link
          to="#"
          onClick={() => setOpen1(true)}
          className={`${style.menuItems__items} ${path === "history" ? style.menuItems__items__active : ""
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
        onClose={onClose1}
        open={open1}
        closeIcon={<img src={ModalCloseIcon} />}
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
          // onClick={() => setOpen(true)}
          onClick={handleMyAccOpen}
          className={`${style.menuItems__items} ${path === "setting" ? style.menuItems__items__active : ""
            }`}
        >
          <div className={style.menuItems__items__img}>
            <img src={Myaccount} />
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
        {accData.map((data, index) => (
          <ManageCustom
            img={Sendhistry}
            name={data.accountName}
            balance={"10 5ire"}
            edited={false}
            checkValue={index}
            onSelectAcc={onSelectAcc}
          />
        ))}
        <AccountSetting img={Createaccount} title="Create New Account" onClick={hanldeCreateNewAcc} />
        <AccountSetting img={Import} title="Import Account" onClick={handleImportAcc} />
        <AccountSetting img={Logout} title="Logout" onClick={handleLogout} />
      </Drawer>

      {path === "wallet" && (
        <Link
          // to="/setting"
          onClick={() => setOpen2(true)}
          className={`${style.menuItems__items} ${path === "setting" ? style.menuItems__items__active : ""
            }`}
        >
          <div className={style.menuItems__items__img}>
            <img src={Setting} />
          </div>
          <span className={style.menuItems__items__title}>Settings</span>
        </Link>
      )}
      <Drawer
        title={
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            Setting
          </span>
        }
        placement="bottom"
        onClose={onClose2}
        open={open2}
        closeIcon={<img src={ModalCloseIcon} />}
      >
        <Link to="/manage-wallet">
          <div className={style.sttings}>
            <div className={style.sttings__left}>
              <img src={Wallet} width={30} height={30} />
              <div className={style.sttings__left__texts}>
                <div className={style.sttings__left__textsTop}>
                  Manage Wallet
                </div>
              </div>
            </div>

            <div className={style.sttings__right}>
              <img src={BackArrow} width={8} height={15} />
            </div>
          </div>
        </Link>
        <SocialAccount />
      </Drawer>
      {(path === "" ||
        path === "createNewWallet" ||
        path === "unlockWallet" ||
        path === "importWallet") && (
          <div className={style.menuItems__needHelp}>
            <p>
              Need help? Contact <a>Support</a>
            </p>
          </div>
        )}
      {path === "beforebegin" && <FooterStepOne />}
      {path === "createwalletchain" && <FooterStepTwo />}
      {path === "setPassword" && <FooterStepThree />}
    </div>
  );
}

export default MenuFooter;
