import React from "react";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders.jsx";
import { InputFieldOnly } from "../../Components/InputField/InputFieldSimple";
import style from "./style.module.scss";
import ButtonComp from "../../Components/ButtonComp/ButtonComp.jsx";
import { Input } from 'antd';

function ImportPhrase() {
const { TextArea } = Input;

  return (
    <div>
      <div className={`scrollableCont`}>
        <MenuRestofHeaders
          backTo={"/setting"}
          title={"Import a Secret Phrase"}
          settingTo={"/setting"}
        />
        <div className={`flexedContent`}>
          <div className={style.input_text}>
            <p>Paste or type your secret Phrase.</p>
           
             <TextArea rows={4} placeholder="Your Secret Phrase" />
            <ButtonComp text={"Proceed"} maxWidth={"100%"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportPhrase;
