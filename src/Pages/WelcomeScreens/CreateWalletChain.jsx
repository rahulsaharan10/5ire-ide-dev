import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import CopyIcon from "../../Assets/CopyIcon.svg";
import Wallet from "../../Hooks/wallet";

function CreateWalletChain() {
  // const navigate = useNavigate();
  let {walletSignUp, authData} = Wallet();


  useEffect(()=>{
    walletSignUp();
    console.log("authData : ",authData);
  },[]);

  return (
    <div className={style.cardWhite}>
      <div className={style.cardWhite__beginText}>
        <h1>Create New Wallet</h1>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>EVM Chain Address:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{authData.evmAddress}</span>
          <img src={CopyIcon} alt="copyIcon" />{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Native Chain Address:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{authData.nativeAddress}</span>
          <img src={CopyIcon} alt="copyIcon"/>{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Mnemonic Phrase:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{authData.mnemonic}</span>
          <img src={CopyIcon} alt="copyIcon"/>{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Ethereum Private Key:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{authData.evmPrivatekey}</span>
          <img src={CopyIcon} alt="copyIcon"/>{" "}
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
