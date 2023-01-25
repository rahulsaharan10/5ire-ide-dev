import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import browser from "webextension-polyfill";
import { setSite, setUIdata, toggleSite } from "../../Store/reducer/auth";

function RejectNotification() {
  const [activeTab, setActiveTab] = useState("detail");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const activeDetail = () => {
    setActiveTab("detail");
  };
  const activeData = () => {
    setActiveTab("data");
  };

  function handleClick(isApproved) {
    if (isApproved) {
      const siteIndex = auth?.connectedSites.findIndex(
        (st) => (st.origin = auth.uiData.message)
      );

      //if not connected but exists in state we will set connected property true
      if (siteIndex > -1) {
        dispatch(toggleSite(auth.uiData.message));
      } else {
        //if use connect same origin again and again we give response back in background script
        dispatch(setSite({ origin: auth.uiData.message, isConnected: true }));
      }
      browser.tabs.sendMessage(auth.uiData.tabId, {
        id: auth.uiData.id,
        response: {
          evmAddress: auth.currentAccount.evmAddress,
          nativeAddress: auth.currentAccount.nativeAddress,
        },
        error: null,
      });
    } else {
      browser.tabs.sendMessage(auth.uiData.tabId, {
        id: auth.uiData.id,
        response: null,
        error: "User rejected connect permission.",
      });
    }

    dispatch(setUIdata({}));

    window.close();
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
          <button onClick={() => handleClick(false)}>Reject</button>

          <button onClick={() => handleClick(true)}>Approve</button>
        </div>
      </div>
    </div>
  );
}

export default RejectNotification;
