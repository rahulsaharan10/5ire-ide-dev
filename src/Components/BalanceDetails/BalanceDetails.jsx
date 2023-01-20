import React, { useState } from "react";
import style from "./style.module.scss";
import { Link, useLocation } from "react-router-dom";
import DarkLogo from "../../Assets/DarkLogo.svg";
import GreenCircle from "../../Assets/greencircle.svg";
import DownArrowSuffix from "../../Assets/DownArrowSuffix.svg";
import WalletCardLogo from "../../Assets/walletcardLogo.svg";
import WalletQr from "../../Assets/walletqr.png";
import ModalCustom from "../ModalCustom/ModalCustom";
import ModelLogo from "../../Assets/modalLogo.svg";
import ScannerImg from "../../Assets/qrimg.svg";
import CopyIcon from "../../Assets/CopyIcon.svg";
import { Select } from "antd";
import ButtonComp from "../ButtonComp/ButtonComp";
import { useSelector } from "react-redux";

function BalanceDetails({ className, textLeft, mt0 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEvmModal, setIsEvmModal] = useState(false);
  const { accountName, currentAccount } = useSelector(state => state.auth);

  const getLocation = useLocation();
  const path = getLocation.pathname.replace("/", "");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const evmModal = () => {
    setIsEvmModal(true);
  };
  const evmOk = () => {
    setIsEvmModal(false);
  };
  const evmCancel = () => {
    setIsEvmModal(false);
  };

  const handleNetworkChange = (e) =>{
      console.log("network :: ",e);

  }

  return (
    <>
      {(path === "wallet" || path === "swapapprove" || path === "rejectnotification") && (
        <div className={`${style.balanceDetails} ${mt0 ? mt0 : ""}`}>
          <div className={style.balanceDetails__decoratedSec}>
            <>
              <img src={DarkLogo} />
              {path === "wallet" && (
                <div className={style.balanceDetails__accountName}>
                  <p>
                    <img src={GreenCircle} />
                    {accountName}
                  </p>
                  <span>0xefcrd....jubh</span>
                  {/* <span>{currentAccount.evmAddress}</span> */}
                </div>
              )}
              <div className={style.balanceDetails__selectStyle}>
                <Select
                  onChange={handleNetworkChange}
                  suffixIcon={<img src={DownArrowSuffix} />}
                  defaultValue={[
                    {
                      value: <span className="flexedItemSelect">Network</span>,
                    },
                  ]}
                  style={{
                    width: 100,
                  }}
                  options={[
                    {
                      value: "qa",
                      label: <span className="flexedItemSelect">QA</span>,
                    },
                    {
                      value: "testnet",
                      label: <span className="flexedItemSelect">Testnet</span>,
                    },
                  ]}
                />
              </div>
            </>
          </div>
          {path === "swapapprove" && (
            <div className={style.balanceDetails__conectedSec}>
              <p className={style.balanceDetails__conectedSec__connectedField}>
                <img src={GreenCircle} />
                connected
              </p>
              <div className={style.balanceDetails__conectedSec__textConatct}>
                <p>Account 1</p>
                <span>0x02da....q12sd</span>
              </div>
            </div>
          )}
          {path === "wallet" && (
            <div className={style.balanceDetails__innerBalance}>
              <div className={style.balanceDetails__innerBalance__totalBalnce}>
                <p>
                  Total Balance : <span>5000 </span>
                </p>
              </div>
              <div className={style.balanceDetails__innerBalance__chainBalance}>
                <div
                  className={style.balanceDetails__innerBalance__balanceCard}
                >
                  <div
                    className={style.balanceDetails__innerBalance__balanceName}
                  >
                    <p>Native Chain Balance</p>
                    <h3>
                      <img src={WalletCardLogo} />
                      3000{" "}
                    </h3>
                  </div>
                  <div className={style.balanceDetails__innerBalance__walletQa}>
                    <img onClick={showModal} src={WalletQr} />
                  </div>
                </div>
                <div
                  className={style.balanceDetails__innerBalance__balanceCard}
                >
                  <div
                    className={style.balanceDetails__innerBalance__balanceName}
                  >
                    <p>EVM Chain Balance</p>
                    <h3>
                      <img src={WalletCardLogo} />
                      3000{" "}
                    </h3>
                  </div>
                  <div className={style.balanceDetails__innerBalance__walletQa}>
                    <img onClick={evmModal} src={WalletQr} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <ModalCustom
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          >
            <div className={style.balanceDetails__nativemodal}>
              <div className={style.balanceDetails__nativemodal__innerContact}>
                <img src={ModelLogo} />
                <p className={style.balanceDetails__nativemodal__title}>
                  5ire Native Chain
                </p>
                <div className={style.balanceDetails__nativemodal__scanner}>
                  <img src={ScannerImg} />
                </div>
                <div className={style.balanceDetails__nativemodal__modalOr}>
                  <p>or</p>
                </div>
                <p className={style.balanceDetails__nativemodal__addressText}>
                  Your 5ire Native Address
                </p>
                <div className={style.balanceDetails__nativemodal__wrapedText}>
                  <p>
                    {currentAccount.nativeAddress}
                    <img src={CopyIcon} />
                  </p>
                </div>
                <div
                  className={style.balanceDetails__nativemodal__footerbuttons}
                >
                  <ButtonComp text={"Share Address"} />
                </div>
              </div>
            </div>
          </ModalCustom>
          <ModalCustom
            isModalOpen={isEvmModal}
            handleOk={evmOk}
            handleCancel={evmCancel}
          >
            <div className={style.balanceDetails__nativemodal}>
              <div className={style.balanceDetails__nativemodal__innerContact}>
                <img src={ModelLogo} />
                <p className={style.balanceDetails__nativemodal__title}>
                  5ire EVM Chain
                </p>
                <div className={style.balanceDetails__nativemodal__scanner}>
                  <img src={ScannerImg} />
                </div>
                <div className={style.balanceDetails__nativemodal__modalOr}>
                  <p>or</p>
                </div>
                <p className={style.balanceDetails__nativemodal__addressText}>
                  Your 5ire EVM Address
                </p>
                <div className={style.balanceDetails__nativemodal__wrapedText}>
                  <p>
                    {currentAccount.evmAddress}
                    <img src={CopyIcon} />
                  </p>
                </div>
                <div
                  className={style.balanceDetails__nativemodal__footerbuttons}
                >
                  <ButtonComp text={"Share Address"} />
                </div>
              </div>
            </div>
          </ModalCustom>
        </div>
      )}
    </>
  );
}

export default BalanceDetails;
