import React from "react";
import SettingList from "../../Components/SettingList/SettingList.jsx"
function Setting() {
  const data = [
    { setinglist: "Import Wallet" },
    {setinglist:"Create Account"},
    {setinglist:"View Secret Phrases"},
    {setinglist:"Select Default Currency"},
    {setinglist:"Address Book"},
    {setinglist:"Select Network"},
    {setinglist:"Privacy Policy"}
  ]
  return (
    <div>
    {data.map((data) => (
      <SettingList setinglist={data.setinglist} />
      ))}
    </div>
  );
}

export default Setting;
