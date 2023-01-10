import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import closeXicon from "../../Assets/closeXicon.svg";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { useNavigate } from "react-router-dom";

function SecretPhrasePaste({ children }) {
  const [activeTab, setActiveTab] = useState("setPassword");
  const navigate = useNavigate();

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
  console.log(blankArray, "asdkjadhskadasd");
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
    <>
      <div className={style.cardWhite}>
        <h2 className={style.cardWhite__title}>Import a Secret Phrase</h2>
        <p className={style.cardWhite__subTitle}>
        Paste or type your secret Phrase.
        </p>
        <div className={style.cardWhite__linkOuter}>
          <div className={style.setPassword__secretPharse}>
            {/* <p className={style.setPassword__secretPharse__grayText}>
              Please select each word in correct to verify you have saved your
              Secret Phrase.
            </p> */}
            <div className={style.setPassword__secretPharse__confirmFieldSBg}>
              <div
                className={
                  style.setPassword__secretPharse__confirmFieldSBgInner
                }
              >
                {blankArray.map((ele, index) => (
                  <span onClick={() => removePhrase(ele)} key={index}>
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
                  <span
                    onClick={() => pushData(ele)}
                    key={index}
                    className={
                      blankArray.includes(ele) ? style.currentItem : ""
                    }
                  >
                    {ele}
                  </span>
                ))}
              </div>
            </div>
            {children}
          </div>
          <div className={style.setPassword__footerbuttons}>
            <ButtonComp
              onClick={() => navigate("/")}
              text={"Back"}
              bordered={true}
            />
            <ButtonComp
              onClick={() => navigate("/createNewWallet")}
              // onClick={() => setActiveTab("/")}
              text={"Proceed"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SecretPhrasePaste;
