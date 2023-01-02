import React from "react";
import style from "./style.module.scss";
import BackArrowIcon from "../../../Assets/BackArrowIcon.svg";
import { Link } from "react-router-dom";
function MenuRestofHeaders({ title, prevBtn, searchTo, backTo }) {
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
            <img onClick={prevBtn} src={BackArrowIcon} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default MenuRestofHeaders;
