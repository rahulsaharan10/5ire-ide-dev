import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CongratulationsScreen from "../../Pages/WelcomeScreens/CongratulationsScreen";
import ButtonComp from "../ButtonComp/ButtonComp";
import style from "./style.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setPassword } from "../../Store/reducer/auth";
import bcrypt from "bcryptjs";

function FooterStepOne() {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.menuItems__cancleContinue}>
        <ButtonComp
          // onClick={() => Navigate("/confirmCurrency")}
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

export const FooterStepTwo = ({ }) => {
  const navigate = useNavigate();
  const handleCancle = () => {
    navigate("/createNewWallet");
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

  const handleCancle = () => {
    navigate("/createwalletchain");
  };

  console.log("selector.passError : ", selector.passError);

  const handleSubmit = () => {
    let pass = selector.pass;
    const passError = selector.passError;
    
    if (!passError) {
      setLoader(true);

      bcrypt.genSalt(10, function (err, salt) {
        if (salt)
          bcrypt.hash(pass, salt, function (err, hash) {
            if (hash) {
              //tood store in reduxx
              setShow(true);

              dispatch(setLogin(true));
              dispatch(setPassword(hash));
              window.chrome.storage.session.set({ "hash": hash })

              setTimeout(() => {
                navigate("/wallet");
              }, 1000);
            }
            if (err) console.log("Error : ", err);
            setLoader(false);
          });
        if (err) console.log("Error : ", err);
        setLoader(false);
      });
    }
  };

  if (loader)
    return (
      <>
        <div className="loader">
          {" "}
          <Spin size="large" />
        </div>
      </>
    );

  return (
    <>
      <div className={style.menuItems__cancleContinue}>
        <ButtonComp
          bordered={true}
          text={"Cancel"}
          maxWidth={"100%"}
          onClick={handleCancle}
        />
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
