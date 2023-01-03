import React from "react";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders.jsx";
import AddressNetworkCard from "../../Components/AddressNetworkCard/AddressNetworkCard.jsx";
function AddresBook() {
  const data = [
    {heading:"ABC",address:"2ertgbmjbgbnddfnvdfmnd",currency:"ETH (Ethereum)"},
    {heading:"ABC",address:"2ertgbmjbgbnddfnvdfmnd",currency:"ETH (Ethereum)"},
    {heading:"ABC",address:"2ertgbmjbgbnddfnvdfmnd",currency:"ETH (Ethereum)"},
  
  ]
  return (
    <div>
      <div className={`scrollableCont`}>
        <MenuRestofHeaders
          backTo={"/setting"}
          title={"Address Book"}
          settingTo={"/setting"}
        />
        <div className={`flexedContent`}>
          {data.map((data) => ( 
            <AddressNetworkCard heading={data.heading} address={data.address} currency={data.currency} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default AddresBook;
