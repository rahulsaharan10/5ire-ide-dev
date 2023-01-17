import { Spin } from "antd";
import bcrypt from 'bcryptjs';
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CongratulationsScreen from "../../Pages/WelcomeScreens/CongratulationsScreen";
import ButtonComp from "../ButtonComp/ButtonComp";
import style from "./style.module.scss";
import { UserContext } from "../../Context";
import KeyringController from 'eth-keyring-controller';
import SimpleKeyring from '@metamask/eth-simple-keyring';

function FooterStepOne() {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.menuItems__cancleContinue}>
        <ButtonComp
          onClick={() => navigate("/createNewWallet")}
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
  return (
    <>
      <div className={style.menuItems__cancleContinue}>
        <ButtonComp bordered={true} text={"Cancel"} maxWidth={"100%"} />
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
  const { pass, setPassmatch } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
        navigate('/wallet')
      }, 4000);
    }
  }, [show]);

  const handleSubmit = () => {
    console.log(pass);

    if (pass.p1 === pass.p2) {
      setPassmatch(true);
      // bcrypt.genSalt(10, function (err, salt) {
      //   if (salt)
      //     bcrypt.hash("", salt, function (err, hash) {
      //       if (hash)
      //         // Store hash in your password DB.
      //         window.chrome.storage.local.set({ password: hash })
      //       // localStorage.setItem("pass", hash);
      //       if (err) console.log("Error : ", err)
      //     });
      //   if (err) console.log("Error : ", err)
      // });
      setLoader(!loader);
      setTimeout(() => {
        setLoader(false);
        setShow(!show);
      }, 1000);
    } else {
      setPassmatch(false);
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
        <ButtonComp bordered={true} text={"Cancel"} maxWidth={"100%"} />
        {show && <div className="loader"><CongratulationsScreen /></div>}

        <ButtonComp
          onClick={handleSubmit}
          text={"Continue"}
          maxWidth={"100%"}
        />
      </div>
    </>
  );
};
