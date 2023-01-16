import React from "react";
import style from "./style.module.scss";

import { Switch, Checkbox } from "antd";
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

function ManageCustom(props) {
  const {edited} = props;
  const { name, currency, img, valuecurrency } = props;
  return (
    <>
      <div className={style.manageList}>
        <div className={style.manageList__imgcurrency}>
          <img src={img} />
          <div className={style.manageList__imgcurrency_Name}>
            <p>
              {currency}
              <span>{valuecurrency}</span>
            </p>
            <span>{name}</span>
          </div>
        </div>
        {edited ? (
          <Switch defaultChecked onChange={onChange} />
        ) : (
          <Checkbox onChange={onChange}>Checkbox</Checkbox>
        )}
      </div>
    </>
  );
}

export default ManageCustom;
