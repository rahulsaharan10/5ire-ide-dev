import React from "react";
import HistryList from "../../Components/HistryList/HistryList";
import Sendhistry from "../../Assets/sendhistry.svg"
function History() {
  const data = [
    {
      TickIcon:Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon:Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon:Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon:Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon:Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon:Sendhistry,
      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon:Sendhistry,

      sendRecieve: "Send",
      coinname: "Bitcoin",
      address: "From | xc1245cddd256..",
      valueCurrency: "0 BTC",
      dollercurrency: "$0.00",
      addressTo: "To | xc1245cddd256..",
    },
    {
      TickIcon:Sendhistry,
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
          TickIcon={data.TickIcon}
        />
      ))}
    </div>
  );
}

export default History;
