import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CongratulationsScreen from "../../Pages/WelcomeScreens/CongratulationsScreen";
import ButtonComp from "../ButtonComp/ButtonComp";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { setLogin, toggleLoader } from "../../Store/reducer/auth";

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
  };
  return (
    <>
      <div className={style.menuItems__cancleContinue}>
        {!isLogin && (
          <ButtonComp
            bordered={true}
            text={"Cancel"}
            maxWidth={"100%"}
            onClick={handleCancle}
          />
        )}

        <ButtonComp onClick={handleClick} text={"Continue"} maxWidth={"100%"} />
      </div>
    </>
  );
};

export const FooterStepThree = () => {
  const { pass, passError } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { setUserPass } = useAuth();
  const dispatch = useDispatch();

  const handleCancle = () => {
    navigate("/createwalletchain");
  };

  const handleSubmit = async () => {
    if (!passError) {
      dispatch(toggleLoader(true));
      let res = await setUserPass(pass);

      if (!res.error) {
        dispatch(toggleLoader(false));

        setShow(true);
        setTimeout(() => {
          dispatch(setLogin(true));

          setShow(false);
          setTimeout(() => {
            navigate("/wallet");
          }, 500);
        }, 2000);
      }

      if (res.error) {
        dispatch(toggleLoader(false));
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
