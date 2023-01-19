import React from "react";
import style from "./style.module.scss";
import BackArrowIcon from "../../../Assets/PNG/arrowright.png";
import SearchIcon from '../../../Assets/SearchIcon.svg'
import { Link } from "react-router-dom";
import SettignIcon from '../../../Assets/SettignIcon.svg';
import Filtericon from "../../../Assets/FilterIcon.svg";
import ChartIcon from '../../../Assets/ChartIcon.svg'
function MenuRestofHeaders({ title, searchTo,backTo, logosilver,settingTo,FilterIcon,chartIcon }) {
  return (
    <div className={`${style.restOfHeaders} stickyHeader`}>
      <div>
      {backTo && (
          <Link to={backTo}>
            <img src={BackArrowIcon} className={style.backarow} />
          </Link>
        )}
      </div>
      <h4>{title}</h4>
      <div>
        {searchTo && (
          <Link to={searchTo}>
            <img src={SearchIcon} />
          </Link>
        )}
        {settingTo && (
          <Link to={settingTo}>
            <img src={SettignIcon} />
          </Link>
        )}
         {FilterIcon && (
          <Link to={FilterIcon}>
            <img src={Filtericon} />
          </Link>
        )}
         {chartIcon && (
          <span style={{cursor:"pointer"}} to={void(0)} onClick={chartIcon}>
            <img src={ChartIcon} />
          </span>
        )}
      </div>
    </div>
  );
}

export default MenuRestofHeaders;
