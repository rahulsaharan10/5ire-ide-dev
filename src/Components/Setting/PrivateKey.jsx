import React, { useEffect } from "react";
import MenuRestofHeaders from "../BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import style from "./style.module.scss";
import CopyIcon from "../../Assets/CopyIcon.svg";
import { useSelector } from "react-redux";
import browser from "../../Scripts/pollyfill";
function PrivateKey() {
  const auth = useSelector((state) => state.auth);
  function handleClick() {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    console.log("HERE APPROVE", auth.uiData);
    auth.uiData.cb("Approve");
    browser.runtime.sendMessage({ ...auth.uiData, result: "Approve" });
    // browser?.tabs.query(
    //   {
    //     active: true,
    //     currentWindow: true,
    //   },
    //   (tabs) => {
    //     const currentTabId = tabs[0].id;
    //     /**
    //      * Sends a single message to the content script(s) in the specified tab,
    //      * with an optional callback to run when a response is sent back.
    //      *
    //      * The runtime.onMessage event is fired in each content script running
    //      * in the specified tab for the current extension.
    //      */
    //     browser.tabs.sendMessage(
    //       currentTabId,
    //       {
    //         ...auth.uiData,
    //         result: "Approve",
    //       },
    //       (response) => {
    //         console.log(response);
    //       }
    //     );
    //   }
    // );
  }
  return (
    <>
      <div className={`scrollableCont`}>
        <MenuRestofHeaders backTo={"/enter-password"} title={""} />
        <div className={`flexedContent`}>
          <div className={style.enterPassword}>
            <div className={style.commonHeadeing}>
              <h1>Your Private Key</h1>
            </div>
            <div className={style.wallet}>
              <div className={style.wallet__addressInput}>
                {/* <label>Native Chain Address:</label> */}
                <p className={style.wallet__addressInput__copyText}>
                  <span>5FWJXakbsYfB2Gskr1AQvTd......nFaeRP5y</span>
                  <img src={CopyIcon} />
                </p>
              </div>
              <button onClick={handleClick}>Approve</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivateKey;
