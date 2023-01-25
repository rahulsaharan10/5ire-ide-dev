import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import CopyIcon from "../../Assets/CopyIcon.svg";
import Wallet from "../../Hooks/useWallet";
import { setCurrentAcc, setAccounts } from "../../Store/reducer/auth";
import { useDispatch, useSelector } from "react-redux";
import { SECRET_KEY, EVM_KEY, NATIVE, EVM } from "../../Constants/index.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateWalletChain() {
  const dispatch = useDispatch();
  const { walletSignUp, authData } = Wallet();
  const selector = useSelector((state) => state.auth);

  const [data, setData] = useState({
    mnemonic: "",
    evmPrivatekey: "",
    evmAddress: "",
    nativeAddress: "",
  });

  useEffect(() => {
    if (selector.currentAccount.mnemonic === "") {
      walletSignUp();
    }
  }, []);

  useEffect(() => {
    let accountName = selector.accountName;

    if (authData.mnemonic) {
      let data_ = {
        ...authData,
        accountName,
      };
      dispatch(setCurrentAcc(data_));
      dispatch(setAccounts(data_));
      setData(data_);
    } else {
      setData(selector.currentAccount);
    }
  }, [authData]);

  const handleCopy = (e) => {
  
    if (e.target.name === NATIVE) 
      navigator.clipboard.writeText(data?.nativeAddress);
    
    if (e.target.name === EVM) 
      navigator.clipboard.writeText(data?.evmAddress);
    
    if (e.target.name === SECRET_KEY) 
      navigator.clipboard.writeText(data?.mnemonic);
    
    if (e.target.name === EVM_KEY) 
      navigator.clipboard.writeText(data?.evmPrivatekey);
    
    toast.success("Copied!");
    
  }

  return (
    <div className={style.cardWhite}>
      <div className={style.cardWhite__beginText}>
        <h1>Create New Wallet</h1>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>EVM Chain Address:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{data?.evmAddress}</span>
          <img src={CopyIcon} alt="copyIcon" name={EVM} onClick={handleCopy} />{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Native Chain Address:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{data?.nativeAddress}</span>
          <img src={CopyIcon} alt="copyIcon" name={NATIVE} onClick={handleCopy} />{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Mnemonic Phrase:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{data?.mnemonic}</span>
          <img src={CopyIcon} alt="copyIcon" name={SECRET_KEY} onClick={handleCopy} />{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Ethereum Private Key:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{data.evmPrivatekey}</span>
          <img src={CopyIcon} alt="copyIcon" name={EVM_KEY} onClick={handleCopy} />{" "}
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
      {/* <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
    </div>
  );
}

export default CreateWalletChain;
