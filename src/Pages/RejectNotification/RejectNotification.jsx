import React, { useState } from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import browser from "webextension-polyfill";
import {
  setSite,
  setUIdata,
  toggleLoader,
  toggleSite,
} from "../../Store/reducer/auth";
import useWallet from "../../Hooks/useWallet";

function RejectNotification() {
  const [activeTab, setActiveTab] = useState("detail");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { evmTransfer } = useWallet();

  const activeDetail = () => {
    setActiveTab("detail");
  };
  const activeData = () => {
    setActiveTab("data");
  };

  function handleClick(isApproved) {
    dispatch(toggleLoader(true));

    if (isApproved) {
      const siteIndex = auth?.connectedSites.findIndex(
        (st) => (st.origin = auth.uiData.message.origin)
      );

      //if not connected but exists in state we will set connected property true
      if (siteIndex > -1) {
        dispatch(toggleSite(auth.uiData.message.origin));
      } else {
        //if use connect same origin again and again we give response back in background script
        dispatch(
          setSite({ origin: auth.uiData.message.origin, isConnected: true })
        );
      }
      const isEthReq = auth.uiData?.message?.method === "eth_requestAccounts";

      browser.tabs.sendMessage(auth.uiData.tabId, {
        id: auth.uiData.id,
        response: isEthReq
          ? [auth.currentAccount.evmAddress]
          : {
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
    dispatch(toggleLoader(false));

    window.close();
  }

  function handleTx(isApproved) {
    if (isApproved) {
      dispatch(toggleLoader(true));

      evmTransfer(
        {
          to: auth?.uiData?.message?.to,
          amount: auth?.uiData?.message?.value,
        },
        true
      ).then((rs) => {
        if (rs.error) {
          browser.tabs.sendMessage(auth.uiData.tabId, {
            id: auth.uiData.id,
            response: null,
            error: rs.data,
          });
        } else {
          browser.tabs.sendMessage(auth.uiData.tabId, {
            id: auth.uiData.id,
            response: rs.data,
            error: null,
          });
        }

        dispatch(setUIdata({}));
        dispatch(toggleLoader(false));

        window.close();
      });
    } else {
      browser.tabs.sendMessage(auth.uiData.tabId, {
        id: auth.uiData.id,
        response: null,
        error: "User rejected  transactoin.",
      });

      dispatch(setUIdata({}));
      window.close();
    }
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
              <h4>From</h4>
              <h4>{auth.currentAccount.evmAddress}</h4>
            </div>
            <div className={style.rejectedSec__listReject__innerList}>
              <h4>To</h4>
              <h4>{auth?.uiData?.message?.to}</h4>
            </div>
            <div className={style.rejectedSec__listReject__innerList}>
              <h4>Value</h4>
              <h4>{auth?.uiData?.message?.value}</h4>
            </div>
          </div>
          <button onClick={() => handleClick(false)}>Reject Connect</button>

          <button onClick={() => handleClick(true)}>Approve Connect</button>

          <button onClick={() => handleTx(false)}>Reject Tx</button>

          <button onClick={() => handleTx(true)}>Approve Tx</button>
        </div>
      </div>
    </div>
  );
}

export default RejectNotification;
