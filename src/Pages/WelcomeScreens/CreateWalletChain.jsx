import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import CopyIcon from "../../Assets/CopyIcon.svg";
function CreateWalletChain() {
  const navigate = useNavigate();
  return (
    <div className={style.cardWhite}>
      <div className={style.cardWhite__beginText}>
        <h1>Create New Wallet</h1>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>EVM Chain Address:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>0x9db871CCfC1aCF472....60Fa3bE0A716e4</span>
          <img src={CopyIcon} />{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Native Chain Address:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>5FWJXakbsYfB2Gskr1AQvTd......nFaeRP5y</span>
          <img src={CopyIcon} />{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Mnemonic Phrase:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>
            mean whale uniform grid coyote hour almost gorilla hunt that horn
            rabbit
          </span>
          <img src={CopyIcon} />{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Ethereum Private Key:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>0xe221dc4f48eda87b3625147ac532d2...6c0</span>
          <img src={CopyIcon} />{" "}
        </p>
      </div>
      <div className={style.cardWhite__noteSec}>
        <h4>Note:</h4>
        <ul>
          <li>
            Your private key and address can’t be recovered if you lose it.
          </li>
          <li> Please store it securely.</li>
        </ul>
      </div>
    </div>
  );
}

export default CreateWalletChain;
