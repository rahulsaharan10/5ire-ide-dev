import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CongratulationsScreen from "../../Pages/WelcomeScreens/CongratulationsScreen";
import ButtonComp from "../ButtonComp/ButtonComp";
import style from "./style.module.scss";
import { useSelector, useDispatch } from "react-redux";
// import { setLogin, setPassword } from "../../Store/reducer/auth"
// import bcrypt from "bcryptjs";
import {toast} from "react-toastify";
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
  const navigate = useNavigate();
  const handleCancle = () => {
    navigate("/beforebegin");
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
        <ButtonComp
          onClick={() => navigate("/setPassword")}
          text={"Continue"}
          maxWidth={"100%"}
        />
      </div>
    </>
  );
};
export const FooterStepThree = () => {
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const selector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUserPass } = useAuth();

  const handleCancle = () => {
    navigate("/createwalletchain");
  };

  const handleSubmit = async () => {
    let pass = selector.pass;
    const passError = selector.passError;

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
