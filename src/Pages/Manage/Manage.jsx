import React from "react";
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders.jsx";
import ManageCustom from "../../Components/ManageCustomtocken/ManageCustom";
import Btc from "../../Assets/Coins/BTC.png"
import ButtonComp from "../../Components/ButtonComp/ButtonComp.jsx";
import style from "./style.module.scss";
function Manage() {
  const data = [{
    img: Btc,
    name: "BITCOIN",
    currency: " BTC",
  },
  {
    img: Btc,
    name: "BITCOIN",
    currency: " BTC",
  },
  {
    img: Btc,
    name: "BITCOIN",
    currency: " BTC",
  },
  {
    img: Btc,
    name: "BITCOIN",
    currency: " BTC",
  },
  {
    img: Btc,
    name: "Carddano",
    currency: "ADA",
    valuecurrency:"/ERC20 "
  },
  ];


  return (
    <div>
      <div className={`scrollableCont`}>
        <MenuRestofHeaders
          backTo={"/wallet"}
          title={"Manage"}
          searchTo={"/setting"}
        />
        <div className={`flexedContent`}>
          <div className={style.spacingbtn}>
            {data.map( (data)=>( 
              <ManageCustom currency={data.currency} name={data.name} img={data.img} valuecurrency={data.valuecurrency} />
            ))}
            <ButtonComp text={"Add Custom Token"} maxWidth={"100%"} />
          </div> 
        </div>
      </div>
    </div>
  );
}

export default Manage;
