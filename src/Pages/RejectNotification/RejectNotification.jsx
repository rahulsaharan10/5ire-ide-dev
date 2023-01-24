import React, { useState } from "react";
import style from "./style.module.scss";
function RejectNotification() {
  const [activeTab, setActiveTab] = useState("detail");
  const activeDetail = () => {
    setActiveTab("detail");
  };
  const activeData = () => {
    setActiveTab("data");
  };
  return (
    <div>
      <div className={style.rejectedSec}>
        <div className={style.rejectedSec__detailDataSec}>
          <div className={style.rejectedSec__sendSwapbtn}>
            <button
              onClick={activeDetail}
              className={`${style.rejectedSec__sendSwapbtn__buttons} 
              ${
                activeTab === "detail" &&
                style.rejectedSec__sendSwapbtn__buttons__active
              }
            `}
            >
              Details
            </button>
            <button
              onClick={activeData}
              className={`${style.rejectedSec__sendSwapbtn__buttons}  ${
                activeTab === "data" &&
                style.rejectedSec__sendSwapbtn__buttons__active
              }`}
            >
              Data
            </button>
          </div>

          <div className={style.rejectedSec__listReject}>
            <div className={style.rejectedSec__listReject__innerList}>
              <h4>Transaction Amount</h4>
              <h4>5 5ire</h4>
            </div>
            <div className={style.rejectedSec__listReject__innerList}>
              <h4>Transaction Amount</h4>
              <h4>5 5ire</h4>
            </div>
            <div className={style.rejectedSec__listReject__innerList}>
              <h4>Transaction Amount</h4>
              <h4>5 5ire</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RejectNotification;
