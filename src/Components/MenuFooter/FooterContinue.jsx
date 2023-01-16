import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CongratulationsScreen from "../../Pages/WelcomeScreens/CongratulationsScreen";
import ButtonComp from "../ButtonComp/ButtonComp";
import style from "./style.module.scss";

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
