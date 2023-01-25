import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CongratulationsScreen from "../../Pages/WelcomeScreens/CongratulationsScreen";
import ButtonComp from "../ButtonComp/ButtonComp";
import style from "./style.module.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";


function FooterStepOne() {

  const navigate = useNavigate();
  return (
    <>
      <div className={style.menuItems__cancleContinue}>
        <ButtonComp
          onClick={() => navigate("/")}
          bordered={true}
          text={"Cancel"}
          maxWidth={"100%"}
        />
        <ButtonComp
          onClick={() => navigate("/createwalletchain")}
          text={"Continue"}
          maxWidth={"100%"}
        />
      </div>
    </>
  );
}
export default FooterStepOne;


export const FooterStepTwo = () => {
  const { isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleCancle = () => {
    // if (isLogin) navigate("/wallet");
    // else navigate("/beforebegin");
    navigate("/beforebegin");
  };

  const handleClick = () => {
    if (isLogin) navigate("/wallet");
    else navigate("/setPassword");
  }
  return (
    <>
      <div className={style.menuItems__cancleContinue}>
        {
          !isLogin &&
          <ButtonComp
            bordered={true}
            text={"Cancel"}
            maxWidth={"100%"}
            onClick={handleCancle}
          />
        }

        <ButtonComp
          onClick={handleClick}
          text={"Continue"}
          maxWidth={"100%"}
        />
      </div>
    </>
  );
};


export const FooterStepThree = () => {
  const { pass, passError } = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { setUserPass } = useAuth();

  const handleCancle = () => {
    navigate("/createwalletchain");
  };

  const handleSubmit = async () => {
    if (!passError) {
      setLoader(true);
      let res = await setUserPass(pass);

      console.log("response : ", res);

      if (!res.error) {
        setLoader(false);
        setShow(true);
        setTimeout(() => {
          setShow(false);
          navigate("/wallet");
        }, 2000);
      }

      if (res.error) {
        setLoader(false);
        toast.error(res.data);
      }
    }
  };

  return (
    <>
      <div className={style.menuItems__cancleContinue}>
        <ButtonComp
          bordered={true}
          text={"Cancel"}
          maxWidth={"100%"}
          onClick={handleCancle}
        />

        {loader && (
          <div className="loader">
            <Spin size="large" />
          </div>
        )}

        {show && (
          <div className="loader">
            <CongratulationsScreen />
          </div>
        )}

        <ButtonComp
          onClick={handleSubmit}
          text={"Continue"}
          maxWidth={"100%"}
        />
      </div>
    </>
  );
};
