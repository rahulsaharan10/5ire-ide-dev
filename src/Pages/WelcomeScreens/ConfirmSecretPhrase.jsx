import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import closeXicon from "../../Assets/closeXicon.svg";

function ConfirmSecretPhrase({ children }) {
  const [blankArray, setBlankArray] = useState([]);
  const phrases = [
    "sense",
    "latter",
    "about",
    "warrior",
    "stage",
    "conduct",
    "orange",
    "form",
    "super",
    "swap",
    "lounge",
    "rookie",
  ];
  console.log(blankArray, "asdkjadhskadasd")
  const pushData = (ele) => {
    let prev = [...blankArray]; // Previous State update
    let pres = prev.findIndex((elem) => elem == ele); // Present state's index gets
    if (pres == -1) {
      prev.push(ele);
      setBlankArray(prev);
    }
  };
  const removePhrase = (ele) => {
    let data = [...blankArray];
    let dataIndex = data.findIndex((elem) => elem == ele);
    data.splice(dataIndex, 1);
    setBlankArray(data);
  };
  return (
    <div className={style.setPassword__secretPharse}>
      <p className={style.setPassword__secretPharse__grayText}>
        Please select each word in correct to verify you have saved your Secret
        Phrase.
      </p>
      <div className={style.setPassword__secretPharse__confirmFieldSBg}>
        <div className={style.setPassword__secretPharse__confirmFieldSBgInner}>
          {blankArray.map((ele, index) => (
            <span  onClick={() => removePhrase(ele)} key={index}>
              {ele} <img src={closeXicon} width={7} height={7} />
            </span>
          ))}
        </div>
      </div>
      <div className={style.setPassword__secretPhrase__latters}>
        <div
          className={`${style.setPassword__secretPharse__confirmFieldSBgInner} ${style.setPassword__secretPharse__confirmFieldSBgInner__bordered}`}
        >
          {phrases.map((ele, index) => (
            <span onClick={() => pushData(ele)} key={index} className={ blankArray.includes( ele) ? style.currentItem : ''}>
              {ele}
            </span>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

export default ConfirmSecretPhrase;
