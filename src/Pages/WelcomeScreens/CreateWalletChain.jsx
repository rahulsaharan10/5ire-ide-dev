import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import CopyIcon from "../../Assets/CopyIcon.svg";
import Wallet from "../../Hooks/wallet";
import { setAccountDetails } from "../../Store/reducer/auth";
import { useDispatch, useSelector } from "react-redux";

function CreateWalletChain() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const { walletSignUp, authData } = Wallet();
  const [data, setData] = useState({
    mnemonic: "",
    evmPrivatekey: "",
    evmAddress: "",
    nativeAddress: "",
  });

  useEffect(() => {
    console.log(
      "selector.accDetails.mnemonic : ",
      selector.accDetails.mnemonic
    );
    if (selector.accDetails.mnemonic === "") {
      walletSignUp();
    }
  }, []);

  useEffect(() => {
    console.log("AuthData : ", authData.mnemonic);

    if (authData.mnemonic) {
      dispatch(setAccountDetails(authData));
      setData(authData);
    } else {
      setData(selector.accDetails);
    }
  }, [authData]);

  return (
    <div className={style.cardWhite}>
      <div className={style.cardWhite__beginText}>
        <h1>Create New Wallet</h1>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>EVM Chain Address:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{data.evmAddress}</span>
          <img src={CopyIcon} alt="copyIcon" />{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Native Chain Address:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{data.nativeAddress}</span>
          <img src={CopyIcon} alt="copyIcon" />{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Mnemonic Phrase:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{data.mnemonic}</span>
          <img src={CopyIcon} alt="copyIcon" />{" "}
        </p>
      </div>
      <div className={style.cardWhite__addressInput}>
        <label>Ethereum Private Key:</label>
        <p className={style.cardWhite__addressInput__copyText}>
          <span>{data.evmPrivatekey}</span>
          <img src={CopyIcon} alt="copyIcon" />{" "}
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
