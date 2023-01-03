import React from "react";
import SettingList from "../../Components/SettingList/SettingList.jsx"
import Download from "../../Assets/download.svg";
import Useredit from "../../Assets/useredit.svg";
import Eyes from "../../Assets/eyes.svg";
import CurrencyIcons from "../../Assets/currencyIcons.svg";
import Editable from "../../Assets/editable.svg";
import Glob from "../../Assets/glob.svg";
import Security from "../../Assets/security.svg";
function Setting() {
  const data = [
    {
      setinglist: "Import Wallet", to: "/import-phrase", ticketcheck:  Download ,  
},
    {setinglist:"Create Account",to:"/import-phrase",ticketcheck: Useredit },
    {setinglist:"View Secret Phrases" ,to:"/import-phrase",ticketcheck: Eyes},
    {setinglist:"Select Default Currency" ,to:"/import-phrase",ticketcheck: CurrencyIcons},
    {setinglist:"Address Book" ,to:"/address",ticketcheck: Editable},
    {setinglist:"Select Network",to:"/import-phrase",ticketcheck: Glob},
    {setinglist:"Privacy Policy",to:"/import-phrase",ticketcheck: Security}
  ]
  return (
    <div>
    {data.map((data) => (
      <SettingList setinglist={data.setinglist} to={data.to} ticketcheck={data.ticketcheck} />
      ))}
    </div>
  );
}

export default Setting;
