import React, { useEffect } from "react";
import MenuRestofHeaders from "../BalanceDetails/MenuRestofHeaders/MenuRestofHeaders";
import style from "./style.module.scss";
import CopyIcon from "../../Assets/CopyIcon.svg";
import { useSelector } from "react-redux";
import browser from "../../Scripts/pollyfill";
function PrivateKey() {
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
