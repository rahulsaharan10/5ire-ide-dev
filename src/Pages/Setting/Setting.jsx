import React from "react";
import SettingList from "../../Components/SettingList/SettingList.jsx"
function Setting() {
  const data = [
    { setinglist: "Import Wallet",to:"/import-phrase" 
},
    {setinglist:"Create Account",to:"/import-phrase"},
    {setinglist:"View Secret Phrases" ,to:"/import-phrase"},
    {setinglist:"Select Default Currency" ,to:"/import-phrase"},
    {setinglist:"Address Book" ,to:"/address"},
    {setinglist:"Select Network",to:"/import-phrase"},
    {setinglist:"Privacy Policy",to:"/import-phrase"}
  ]
  return (
    <div>
    {data.map((data) => (
      <SettingList setinglist={data.setinglist} to={data.to} />
      ))}
    </div>
  );
}

export default Setting;
