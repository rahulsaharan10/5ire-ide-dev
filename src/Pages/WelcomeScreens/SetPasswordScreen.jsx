import React, { useState,useEffect } from "react";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
import { setPassword } from '../../Store/reducer/counter';
import { useDispatch } from 'react-redux';

function SetPasswordScreen() {

  const [pass, setPass] = useState({pass:"",confirmPass:""});
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if (pass.pass === pass.confirmPass) {
      dispatch(setPassword(pass.pass));      
    }
  },[pass,dispatch]);

  const handleChange = (e) => {
    setPass((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    });
  }

  return (
    <div className={`${style.cardWhite}`}>
      <div className={style.cardWhite__beginText}>
        <h1>Create Password</h1>
        <p>
          Your password is used to unlock your wallet and is stored securely on
          your device. We recommend 12 characters, with uppercase and lowercase
          letters, symbols and numbers.
        </p>
        <div className={style.cardWhite__beginText__passInputSec}>
          <InputFieldOnly
            name="pass"
            onChange={handleChange}
            placeholder={"Enter Password"}
            placeholderBaseColor={true}
            coloredBg={true}
          />
        </div>
        <div className={style.cardWhite__beginText__passInputSec}>
          <InputFieldOnly
            name="confirmPass"
            onChange={handleChange}
            placeholder={"Confirm  Password"}
            placeholderBaseColor={true}
            coloredBg={true}
          />
        </div>
      </div>
    </div>
  );
}

export default SetPasswordScreen;
