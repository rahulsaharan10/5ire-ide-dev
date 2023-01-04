import React from "react";
import style from "./style.module.scss";
import BackArrowIcon from "../../../Assets/BackArrowIcon.svg";
import SearchIcon from '../../../Assets/SearchIcon.svg'
import { Link } from "react-router-dom";
import SettignIcon from '../../../Assets/SettignIcon.svg';
import Filtericon from "../../../Assets/FilterIcon.svg";
function MenuRestofHeaders({ title, searchTo, backTo,settingTo,FilterIcon }) {
  return (
    <div className={`${style.restOfHeaders} stickyHeader`}>
      <div>
        {backTo && (
          <Link to={backTo}>
            <img src={BackArrowIcon} />
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
      </div>
    </div>
  );
}

export default MenuRestofHeaders;
