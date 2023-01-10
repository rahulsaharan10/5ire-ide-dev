import React, { useRef, useState } from "react";
import style from "./style.module.scss";
import CopyIcon from "../../Assets/CopyIconBlue.svg";
import { Checkbox, message } from "antd";
function SecretPhrase({ children }) {
  const [messageApi, contextHolder] = message.useMessage();
  const phrases = [
    " sense",
    " latter",
    " about",
    " warrior",
    " stage",
    " conduct",
    " orange",
    " form",
    " super",
    " swap",
    " lounge",
    " rookie",
  ];
  function copyToClipboard() {
    const str = phrases.join(",").replaceAll(",", " ");
    navigator.clipboard.writeText(str);
    messageApi.success("Phrase Copied");
  }
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className={style.setPassword__secretPharse}>
      <p className={style.setPassword__secretPharse__grayText}>
        Write down or copy these words in the right order and save them
        somewhere safe.
      </p>
      <div>
        <div className={style.setPassword__secretPharse__fieldSBg}>
          <div className={style.setPassword__secretPharse__fieldSBgInner}>
            {phrases.map((ele, index) => (
              <span key={index}>
                {index + 1}. {ele}
              </span>
            ))}
          </div>
        </div>
        <div
          onClick={copyToClipboard}
          className={style.setPassword__secretPharse__copyField}
        >
          {contextHolder}
          <img src={CopyIcon} width={14} height={16} />
          <span>Copy</span>
        </div>
        <div className={"checkboxOuter"}>
        <Checkbox onChange={onChange}>
          I understand that i stand the risk of losing my funds by exposing my
          seed phrase to others
        </Checkbox>
        </div>
      </div>
      {children}
    </div>
  );
}

export default SecretPhrase;
