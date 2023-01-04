import { Input } from "antd";
import React from "react";
import EyeOpenIcon from "../../Assets/EyeOpenIcon.svg";
import EyeCloseIcon from "../../Assets/EyeCloseIcon.svg";
import style from "./style.module.scss";
import Scanner from "../../Assets/scanner.svg"
import { Link } from "react-router-dom";
function InputFieldSimple({ placeholder }) {
  return (
    <Input.Password
      className={style.inputSimple}
      placeholder={placeholder}
      iconRender={(visible) =>
        visible ? (
          <img src={EyeOpenIcon} width={19} height={12} />
        ) : (
          <img src={EyeCloseIcon} width={19} height={16} />
        )
      }
    />
  );
}

export default InputFieldSimple;

export const InputField = ({
  placeholder,
  defaultValue,
  label,
  addonAfter,
  inputSelect,scannerText,
  mb0
}) => {
  return (
    <div className={`${style.boxStyle} inputField ${mb0 ? style.mb0 : ""}`}>
      <label className={style.boxStyle__label}>{label}</label>
      <Input
        className={`${style.inputField__input} ${inputSelect ? style.inputField__inputSelect : ""}`}
        addonAfter={addonAfter}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      {/* { scannerText ? (
        <div className={style.scannerText}><img src={Scanner} /><p><Link to="#"></Link>Paste</p></div>
        ) : null} */}
    </div>
  );
};

export const InputFieldOnly = ({ placeholder, label,minHeight }) => {
  return (
    <div className={`${style.boxStyle} inputFieldOnly `}>
      <label className={style.boxStyle__label}>{label}</label>
      <Input className={style.inputSimple} placeholder={placeholder}  style={{minHeight: minHeight}} />
    </div>
  );
};
