import React, { useState } from "react";
import style from "./style.module.scss";
import { useSelector } from "react-redux";
import browser from "../../Scripts/pollyfill";

function RejectNotification() {
  const [activeTab, setActiveTab] = useState("detail");
  const activeDetail = () => {
    setActiveTab("detail");
  };
  const activeData = () => {
    setActiveTab("data");
  };

  const auth = useSelector((state) => state.auth);
  function handleClick() {
    browser.tabs.sendMessage(
      auth.uiData.tabId,
      {
        id: auth.uiData.id,
        response: "Approved",
        error: null,
      },
      (response) => {
        console.log(response);
      }
    );
  }
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
          <button onClick={handleClick}>Approve</button>
        </div>
      </div>
    </div>
  );
}

export default RejectNotification;
