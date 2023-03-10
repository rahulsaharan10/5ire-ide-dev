import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
// import { setAccountName } from "../../Store/reducer/auth";
import { useSelector } from "react-redux";
import useWallet from "../../Hooks/useWallet";

function ImportWallet() {
  const navigate = useNavigate();
  const { importAccount } = useWallet();
  const [data, setData] = useState({ accName: "", key: "" });
  const [warrning, setWarrning] = useState("");
  const { isLogin } = useSelector(state => state.auth);

const handleChange = (e) => {
  setData(p => ({ ...p, [e.target.name]: e.target.value }));
  setWarrning("");
  };

  const handleClick = async () => {
    if (data.accName.length === 0) setWarrning("Please enter your account name!");
    else if (data.key.length === 0) setWarrning("Please enter your secret mnemonic!");
    else {
      let res = await importAccount(data);
      if (res.error) {
        setWarrning(res.data);
      } else {
        setWarrning("");
        if (isLogin) {
          navigate("/wallet");
        }
        else{
          navigate("/setPassword");
        }
      }
    }
  };

  return (
    <div className={style.cardWhite}>
      <MenuRestofHeaders logosilver={true} title="Import Account" />
      <div className={style.cardWhite__cardInner}>
        <div className={style.cardWhite__cardInner__innercontact}>
          <h1>Enter your credentials </h1>
        </div>
        <div className={style.cardWhite__linkOuter}>
          <p style={{ color: "red" }}>{warrning}</p>
          <InputFieldOnly
            placeholder={"Enter Account name"}
            placeholderBaseColor={true}
            coloredBg={true}
            name="accName"
            onChange={handleChange}
          />
          <InputFieldOnly
            type="password"
            placeholder={"Enter mnemonic here"}
            placeholderBaseColor={true}
            coloredBg={true}
            name="key"
            onChange={handleChange}
          />
        </div>
        <div className={style.setPassword__footerbuttons}>
          <ButtonComp onClick={handleClick} text={"Import"} />
        </div>
      </div>
    </div>
  );
}

export default ImportWallet;
