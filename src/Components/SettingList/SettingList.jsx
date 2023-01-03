// import Link from 'antd/es/typography/Link';
import { Link } from "react-router-dom";
import React from "react";
import ticketcheck from "../../Assets/TickIcon.svg";
import style from "./style.module.scss";

function SettingList(props) {
  const { setinglist, to } = props;
  return (
    <>
      <div className={style.listItems}>
        <Link to={to}>
          <div className={style.settingList}>
            <div className={style.settingList__imgValue}>
              <img src={ticketcheck} />
              <p>{setinglist}</p>
            </div>
            <img src={ticketcheck} />
          </div>
        </Link>
      </div>
    </>
  );
}

export default SettingList;
