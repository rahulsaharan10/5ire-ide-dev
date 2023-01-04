import React, { useState } from "react";
import SettingList from "../../Components/SettingList/SettingList.jsx";
import Download from "../../Assets/download.svg";
import Useredit from "../../Assets/useredit.svg";
import Eyes from "../../Assets/eyes.svg";
import CurrencyIcons from "../../Assets/currencyIcons.svg";
import Editable from "../../Assets/editable.svg";
import Glob from "../../Assets/glob.svg";
import Security from "../../Assets/security.svg";
import ModalCustom from "../../Components/ModalCustom/ModalCustom.jsx";
import InputFieldSimple from "../../Components/InputField/InputFieldSimple.jsx";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import style from "./style.module.scss";
import warning from "../../Assets/PNG/warning.png";
function Setting() {
  const [isModalOpen, setOpenmodal] = useState(false);
  const onClick = () => {
    setOpenmodal(true);
  };

  const handleOk = () => {
    setOpenmodal(false);
  };

  const handleCancel = () => {
    setOpenmodal(false);
  };
  const data = [
    {
      setinglist: "Import Wallet",
      to: "/import-phrase",
      ticketcheck: Download,
    },
    {
      setinglist: "Create Account",
      // to: "/import-phrase",
      ticketcheck: Useredit,
    },
    {
      setinglist: "View Secret Phrases",
      ticketcheck: Eyes,
      onClick: onClick
    },
    {
      setinglist: "Select Default Currency",
      // to: "/import-phrase",
      ticketcheck: CurrencyIcons,
    },
    {
      setinglist: "Address Book",
      to: "/address",
      ticketcheck: Editable
    },
    {
      setinglist: "Select Network",
      // to: "/import-phrase",
      ticketcheck: Glob
    },
    {
      setinglist: "Privacy Policy",
      // to: "/import-phrase",
      ticketcheck: Security,
    },
  ];
  return (
    <div>
      {data.map((data) => (
        <SettingList
          setinglist={data.setinglist}
          to={data.to}
          ticketcheck={data.ticketcheck}
          onClick={data.onClick}
        />
      ))}

      <ModalCustom
        title={"Show Secret Phrase"}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        customClass="customClassModal"
      >
        <div className={style.viewphrases}>
          <InputFieldSimple placeholder="password" />
          <div className={style.viewphrases__iInner}>
            <img src={warning} />
            <div>
              <p>Do Not share your secret Phrase!</p>
              <p>These words can be used to steal all your funds.</p>
            </div>
          </div>
          <ButtonComp text={"Proceed"} maxWidth={"100%"} />
        </div>
      </ModalCustom>
    </div>
  );
}

export default Setting;
