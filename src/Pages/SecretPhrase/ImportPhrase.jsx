import React, { useState } from "react";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders.jsx";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
import ButtonComp from "../../Components/ButtonComp/ButtonComp.jsx";
import { Input,message } from "antd";
import closeXicon from "../../Assets/closeXicon.svg";
import CopyIconBlue from '../../Assets/CopyIconBlue.svg'
function ImportPhrase() {
  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();

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
  function copyToClipboard() {
    const str = phrases.join(",").replaceAll(",", " ");
    navigator.clipboard.writeText(str);
    messageApi.success("Phrase Copied");
  }
  return (
    <div>
      <div className={`scrollableCont`}>
        <MenuRestofHeaders
          backTo={"/setting"}
          title={"Import a Secret Phrase"}
        />
        <div className={`flexedContent`}>
          <div className={style.input_text}>
            <p>Paste or type your secret Phrase.</p>
            <div className={style.cardBg}>
              <div className={style.cardBg__inner}>
                {phrases.map((ele, index) => (
                  <span key={index}>
                    {ele} <img src={closeXicon} width={7} height={7} />
                  </span>
                ))}
              </div>
              <div className={style.cardBg__copyIcon} onClick={copyToClipboard}>{contextHolder}<img src={CopyIconBlue} width={14} height={14} /></div>
            </div>
            {/* <TextArea rows={4} placeholder="Your Secret Phrase" /> */}
            <ButtonComp text={"Proceed"} maxWidth={"100%"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportPhrase;
