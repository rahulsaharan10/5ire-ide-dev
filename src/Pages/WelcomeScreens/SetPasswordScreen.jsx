import React, { useContext, useState } from "react";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
import { UserContext } from "../../Context";

function SetPasswordScreen() {
  let { setPass } = useContext(UserContext);
  // const [pass, setPass] = useState();

  const handleChange = (e) => {
    setPass((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
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
            name="p1"
            onChange={handleChange}
            placeholder={"Enter Password"}
            placeholderBaseColor={true}
            coloredBg={true}
          />
        </div>
        <div className={style.cardWhite__beginText__passInputSec}>
          <InputFieldOnly
            name="p2"
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
