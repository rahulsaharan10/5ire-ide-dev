import React from "react";
import { Spin } from "antd";
import CongratulationsScreen from "../../Pages/WelcomeScreens/CongratulationsScreen";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
import PlaceLogo from "../../Assets/PlaceLog.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
// import { useDispatch, useSelector } from "react-redux";

function UnlockWelcome() {
  const navigate = useNavigate();
  const { verifyPass } = useAuth();
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  // const dispatch = useDispatch();
  const [data, setData] = useState("");

  const location = useLocation();

  console.log(location, " useLocation Hook", location.state?.data);

  const handleChange = (e) => {
    setData(e.target.value);
    console.log(e.target.value);
  };

  const handleClick = async () => {
    let res = await verifyPass(data);

    console.log("res : ", res.data);
    if (!res.error) {
      navigate(location.state?.redirectRoute || "/wallet");
    } else {
      console.log("Error", res.data);
    }
  };
  return (
    <div className={style.cardWhite}>
      <MenuRestofHeaders logosilver={true} title="5ire Non-Custodial Wallet" />
      <div className={style.cardWhite__cardInner}>
        <div className={style.cardWhite__cardInner__centerLogo}>
          <div className={style.cardWhite__cardInner__innerLogocontact}>
            <img src={PlaceLogo} />
            <div className={style.cardWhite__cardInner__innercontact}>
              <h1>Welcome Back!</h1>
              <span>The decentralized web awaits</span>
            </div>
          </div>
        </div>
        <div className={style.cardWhite__linkOuter}>
          <InputFieldOnly
            type="password"
            name={"key"}
            onChange={handleChange}
            placeholder={"Enter Password"}
            placeholderBaseColor={true}
            coloredBg={true}
          />
        </div>
        <div className={style.setPassword__footerbuttons}>
          <ButtonComp onClick={handleClick} text={"Unlock"} />
        </div>
        <div className={style.forgotLink}>
          <Link to="">Forgot password?</Link>
        </div>
      </div>
      {/* 
      {loader && (
        <div className="loader">
          <Spin size="large" />
        </div>
      )}

      {show && (
        <div className="loader">
          <CongratulationsScreen />
        </div>
      )} */}
    </div>
  );
}

export default UnlockWelcome;
