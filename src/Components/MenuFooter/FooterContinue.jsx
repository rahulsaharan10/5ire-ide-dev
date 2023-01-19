import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CongratulationsScreen from "../../Pages/WelcomeScreens/CongratulationsScreen";
import ButtonComp from "../ButtonComp/ButtonComp";
import style from "./style.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from "../../Store/reducer/counter";
import bcrypt from 'bcryptjs';


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
    navigate("/beforebegin");
  }
  return (
    <>
      <div className={style.menuItems__cancleContinue}>
        <ButtonComp bordered={true} text={"Cancel"} maxWidth={"100%"} onClick={handleCancle} />
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
  const selector = useSelector((state) => state.password);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
        navigate('/wallet')
      }, 2000);
    }
  }, [show]);

  const handleCancle = () => {
    navigate("/createwalletchain");
  }

  const handleSubmit = () => {
    let pass = selector.pass;

    // console.log("accDetails : ",accDetails);

    bcrypt.genSalt(10, function (err, salt) {
      if (salt)
        bcrypt.hash(pass, salt, function (err, hash) {
          if (hash) {

            window.chrome.storage.local.set({ password: hash });
            window.chrome.storage.local.set({ login: true })
            dispatch(setLogin(true));
          }
          if (err) console.log("Error : ", err)
        });
      if (err) console.log("Error : ", err)
    });

    window.chrome.storage.local.get(["password"]).then((result) => {
      console.log("Result : ", result);
    })

    setLoader(!loader);
    setTimeout(() => {
      setLoader(false);
      setShow(!show);
    }, 1000);

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
        <ButtonComp bordered={true} text={"Cancel"} maxWidth={"100%"} onClick={handleCancle} />
        {/* {show && <div className="loader"><CongratulationsScreen /></div>} */}

        <ButtonComp
          onClick={handleSubmit}
          text={"Continue"}
          maxWidth={"100%"}
        />
      </div>
    </>
  );
};
