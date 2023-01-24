import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
// import { setAccountName } from "../../Store/reducer/auth";
// import { useDispatch } from "react-redux";
import useWallet from "../../Hooks/wallet";

function ImportWallet() {
  const navigate = useNavigate();
  const { importAccount } = useWallet();
  const [data, setData] = useState("");
  const [warrning, setWarrning] = useState("");
  // const dispatch = useDispatch();

  const handleChange = (e) => {
    setData(e.target.value);
    setWarrning("");
  };

  const handleClick = async () => {
    if (data.length === 0) setWarrning("Please enter your secret mnemonics!");
    else {
      let res = await importAccount(data);
      console.log("Response : ", res);
      if (res.error) {
        setWarrning(res.data);
      } else {
        setWarrning("");
        navigate("/wallet");
        console.log("Error : ", res.data);
      }
    }
  };

  return (
    <div className={style.cardWhite}>
      <MenuRestofHeaders logosilver={true} title="Import Account" />
      <div className={style.cardWhite__cardInner}>
        <div className={style.cardWhite__cardInner__innercontact}>
          <h1>Enter your mnemonic </h1>
        </div>
        <div className={style.cardWhite__linkOuter}>
          <p style={{ color: "red" }}>{warrning}</p>
          <InputFieldOnly
            placeholder={"Enter mnemonic here"}
            placeholderBaseColor={true}
            coloredBg={true}
            name="mnemonic"
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
