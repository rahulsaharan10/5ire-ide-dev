import React from "react";
import style from "./style.module.scss";
import switchbutton from "../switchbutton/switchbutton.jsx";
import { Switch } from 'antd';
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};
function ManageCustom(props) {
  const { name, currency, img,valuecurrency } = props;
  return (
    <>
      <div className={style.manageList}>
        <div className={style.manageList__imgcurrency}>
          <img src={img} />
          <div className={style.manageList__imgcurrency_Name}>
            <p>{currency}<span>{valuecurrency}</span></p>
            <span>{name}</span>
          </div>
        </div>
        <Switch defaultChecked onChange={onChange} />
      </div>
    </>
  );
}

export default ManageCustom;
