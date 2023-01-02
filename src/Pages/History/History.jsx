import React from "react";
import HistryList from "../../Components/HistryList/HistryList";
import TickIcon from "../../Assets/TickIcon.svg"
function History() {
  const data = [
    {
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
  ];
  return (
    <div>
      {data.map((data) => (
        <HistryList
          sendRecieve={data.sendRecieve}
          coinname={data.coinname}
          address={data.address}
          valueCurrency={data.valueCurrency}
          dollercurrency={data.dollercurrency}
          addressTo={data.addressTo}
        />
      ))}
    </div>
  );
}

export default History;
