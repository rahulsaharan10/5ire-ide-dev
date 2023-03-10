import React from "react";
import style from "./style.module.scss";

import { Switch, Checkbox, Radio } from "antd";


function ManageCustom({ name, balance, img, checkValue, edited, onSelectAcc} ) {

  return (
    <>
      <div className={style.manageList}>
        <div className={style.manageList__imgcurrency}>
          <img src={img} />
          <div className={style.manageList__imgcurrency_Name}>
            <p>
              {name}
              {/* <span>{valuecurrency}</span> */}
            </p>
            <span>{balance}</span>
          </div>
        </div>
        {edited ? (
          <Switch defaultChecked
          //  onChange={onChange} 
           />
        ) : (
          <input type="radio" name="accounts" value={checkValue} onChange={onSelectAcc} className={style.checkbox}/>
        )}
      </div>
    </>
  );
}

export default ManageCustom;
