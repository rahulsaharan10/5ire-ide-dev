import React, { useRef, useState } from "react";
import style from "./style.module.scss";
import CopyIcon from "../../Assets/CopyIcon.svg";
import { message } from "antd";
function SecretPhrase({ children }) {
    const [messageApi, contextHolder] = message.useMessage()
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
    messageApi.success('Phrase Copied');
  }
  return (
    <div className={style.setPassword__secretPharse}>
      <p className={style.setPassword__secretPharse__grayText}>
        You will be shown a Secret Phrase on the next screen. It allows you to
        recover your wallet even if you lose your device or forget your
        password.
      </p>
      <div className={style.setPassword__secretPharse__fieldSBg}>
        <div className={style.setPassword__secretPharse__fieldSBgInner}>
          {phrases.map((ele, index) => (
            <span key={index}>{ele}</span>
          ))}
        </div>
        <div
          onClick={copyToClipboard}
          className={style.setPassword__secretPharse__copyField}
        >{contextHolder}

          <img src={CopyIcon} width={12} height={12} />
        </div>
      </div>
      {children}
    </div>
  );
}

export default SecretPhrase;
