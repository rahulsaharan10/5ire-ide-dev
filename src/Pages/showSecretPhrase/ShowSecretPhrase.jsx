import React, { useRef, useState } from "react";
import CopyIcon from "../../Assets/CopyIconBlue.svg";
import { Checkbox, message } from "antd";
import style from "./style.module.scss";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
function showSecretPhrase() {
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
    <>
      <div className={`scrollableCont`}>
        <MenuRestofHeaders backTo={"/wallet"} title={"Secret Phrase"} />
        <div className={`flexedContent`}>
          <div className="">
            <div className={`${style.copyPhrase} ${style.setPhrase}`}>
              <div className={style.setPhrase__secretPharse}>
                <h2 className={style.setPhrase__secretPharse__title}>
                  Your Secret Phrase
                </h2>
                <p className={style.setPhrase__secretPharse__grayText}>
                  Write down or copy these words in the right order and save
                  them somewhere safe.
                </p>
                <div>
                  <div className={style.setPhrase__secretPharse__fieldSBg}>
                    <div
                      className={style.setPhrase__secretPharse__fieldSBgInner}
                    >
                      {phrases.map((ele, index) => (
                        <span key={index}>
                          {index + 1}. {ele}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    onClick={copyToClipboard}
                    className={style.setPhrase__secretPharse__copyField}
                  >
                    {contextHolder}
                    <img src={CopyIcon} width={14} height={16} />
                    <span>Copy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default showSecretPhrase;
