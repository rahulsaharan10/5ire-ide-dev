import React, { useState, useEffect } from "react";
import WalletCardLogo from "../../Assets/walletcardLogo.svg";
import style from "./style.module.scss";
import Approve from "../Approve/Approve";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import ModalCustom from "../../Components/ModalCustom/ModalCustom";
import ComplSwap from "../../Assets/tranCompl.svg";
import useWallet from "../../Hooks/useWallet";
import { shortner } from "../../Helper/TxShortner";
import CopyIcon from "../../Assets/CopyIcon.svg";
import { toast } from "react-toastify";
import { NATIVE, EVM } from "../../Constants/index";
import {
  InputField,
  InputFieldOnly,
} from "../../Components/InputField/InputFieldSimple";


function Send() {

  const { evmTransfer, nativeTransfer, getEvmBalance, getNativeBalance, retriveEvmFee, retriveNativeFee } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("native");
  const [txHash, setTxHash] = useState("");
  const [data, setData] = useState({ to: "", amount: "", memo: "" });
  const [err, setErr] = useState({ err: "", to: "", amount: "" });
  const [gassFee, setGassFee] = useState("");

  useEffect(() => {

    if (data.to && data.amount) {
      getFee();
    }else{
      setGassFee("0")
    }
  }, [data, activeTab])


  const getFee = async () => {
    let fee = 0;

    if ((activeTab).toLocaleLowerCase() === NATIVE.toLowerCase()) {
      fee = await retriveNativeFee(data.to, data.amount);
    }
    if ((activeTab).toLocaleLowerCase() === EVM.toLowerCase()) {
      fee = await retriveEvmFee(data.to, data.amount);
    }
    setGassFee(fee);
  }


  const activeSend = (e) => {
    setActiveTab(e.target.name);
    setData({ to: "", amount: "", memo: "" });
    setGassFee(0);
    setErr({ err: "", to: "", amount: "" });
  };


  const handleChange = (e) => {
    setData(p => ({
      ...p,
      [e.target.name]: e.target.value
    })
    )
    setErr(p => ({ ...p, [e.target.name]: "" }));
  }

  const handleApprove = async () => {
    try {
      if (!(data.amount) || isNaN(data.amount))
        setErr(p => ({ ...p, amount: "Please enter amount correctly!" }));

      if (activeTab.toLowerCase() === EVM.toLowerCase()) {

        if (!(data.to) || !(data.to.startsWith("0x")))
          setErr(p => ({ ...p, to: "Please enter to address correctly!" }));
        else {
          const res = await evmTransfer(data);

          if (res.error)
            setErr(p => ({
              ...p,
              err: res.data
            }));

          else {
            getEvmBalance();
            getNativeBalance();
            setTxHash(res.data);
            setIsModalOpen(true);

          }
        }
      }

      if (activeTab?.toLowerCase() === NATIVE.toLowerCase()) {

        if (!(data.to) || !(data.to.startsWith("5")))
          setErr(p => ({ ...p, to: "Please enter to address correctly!" }));
        else {
          const res = await nativeTransfer(data);

          if (res.error)
            setErr(p => ({
              ...p,
              err: res.data
            }));

          else {
            getEvmBalance();
            getNativeBalance();
            setTxHash(res.data);
            setIsModalOpen(true);
          }
        }
      }
    } catch (error) {
      console.error("Error : ", error)
      setErr(p => ({
        ...p,
        err: "Error occured!"
      }));

    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setData({ to: "", amount: "", memo: "" });

  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setData({ to: "", amount: "", memo: "" });
  };

  const handleCopy = () => {
    console.log("TX Hash : ", txHash);
    navigator.clipboard.writeText(txHash);
    toast.success("Copied!");
  }


  return (
    <>
      <div className={style.sendSec}>
        <div className={`scrollableCont ${style.sendSec__sourceLabel}`}>
          <label>Source Chain :</label>
          <div className={style.sendSec__sendSwapbtn}>
            <button
              name="native"
              onClick={activeSend}
              className={`${style.sendSec__sendSwapbtn__buttons} 
              ${activeTab === "native" &&
                style.sendSec__sendSwapbtn__buttons__active
                }
            `}
            >
              Native
            </button>
            <button
              onClick={activeSend}
              name="evm"
              className={`${style.sendSec__sendSwapbtn__buttons}  ${activeTab === "evm" &&
                style.sendSec__sendSwapbtn__buttons__active
                }`}
            >
              EVM
            </button>
          </div>
        </div>
        <div className={style.sendSec__inputInnerSec}>
          <h5 style={{ color: "red" }}>{err.err}</h5>

          <span style={{ color: "red" }}>{err.to}</span>
          <InputFieldOnly
            name="to"
            value = {data.to}
            placeholder={"Please enter recipient address"}
            placeholderBaseColor={true}
            coloredBg={true}
            onChange={handleChange}
          />
          <div>
            <span style={{ color: "red" }}>{err.amount}</span>
            <InputField
              name="amount"
              value = {data.amount}
              placeholder={"Enter Amount"}
              onChange={handleChange}
              addonAfter={
                <span className={style.sendSec__pasteText}>
                  <img src={WalletCardLogo} alt="logo" />
                  5ire
                </span>
              }
            />

            {/* <span className={style.sendSec__spanbalanceText}>
              Balance 00.0000 5IRE
            </span> */}
          </div>
          <InputFieldOnly
            name="memo"
            placeholder={"Memo (Optional)"}
            onChange={handleChange}
            placeholderBaseColor={true}
            coloredBg={true}
          />
        </div>
        <div className={style.sendSec__transactionFee}>
          <p>Transaction Fee : {gassFee} 5IRE</p>
        </div>
      </div>
      <Approve onClick={handleApprove} />

      <ModalCustom
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <div className="swapsendModel">
          <div className="innerContact">
            <img src={ComplSwap} alt="swapImage" />
            <h2 className="title">Transfer Completed</h2>
            <p className="transId">Your Transaction ID</p>
            <span className="address">{shortner(txHash)}</span>
            <img src={CopyIcon} alt="copyIcon" name="naiveAddress" onClick={handleCopy} />

            <div className="footerbuttons">
              <ButtonComp text={"Swap Again"} />
            </div>
          </div>
        </div>
      </ModalCustom>
    </>
  );
}

export default Send;
