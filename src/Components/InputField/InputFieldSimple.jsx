import { Input } from "antd";
import React from "react";
import EyeOpenIcon from "../../Assets/EyeOpenIcon.svg";
import EyeCloseIcon from "../../Assets/EyeCloseIcon.svg";
import style from "./style.module.scss";

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
}) => {
  return (
    <div className={`${style.boxStyle} inputField`}>
      <label className={style.boxStyle__label}>{label}</label>
      <Input
        className={style.inputField__input}
        addonAfter={addonAfter}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
};

export const InputFieldOnly = ({ placeholder, label }) => {
  return (
    <div className={`${style.boxStyle} inputFieldOnly`}>
      <label className={style.boxStyle__label}>{label}</label>
      <Input className={style.inputSimple} placeholder={placeholder} />
    </div>
  );
};
