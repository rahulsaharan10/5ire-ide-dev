import React from 'react'
import BSC from "../../Assets/Coins/BSC.png";
import Unitedstate from "../../Assets/cuntry/unitedstate.svg"
import style from "./style.module.scss";
import Newzealand from "../../Assets/cuntry/newzealand.svg";
import Europe from "../../Assets/cuntry/europe.svg"
import MenuRestofHeaders from "../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders"
function CurrencyPrefrence() {
    const data = [

        {
            img: Unitedstate,
            currency: "USD - United State Dollar - $",
            default:"(Default)"
        },
        {
            img: Newzealand,
            currency: "NZD - New Zealand Dollar - $",
        },
        {
            img: Europe,
            currency: "Europe",
        },
        {
            img: Unitedstate,
            currency: "USD - United State Dollar - $",
        },
        {
            img: Newzealand,
            currency: "NZD - New Zealand Dollar - $",
        },
        {
            img: Europe,
            currency: "Europe",
        },
      
        {
            img: Unitedstate,
            currency: "USD - United State Dollar - $",
        },
        {
            img: Newzealand,
            currency: "NZD - New Zealand Dollar - $",
        },
        {
            img: Europe,
            currency: "Europe",
        },
        
    ]
  return (
      <>
          <div className={`scrollableCont`}>
        <MenuRestofHeaders backTo={"/wallet"} title={"Secret Phrase"} />
              <div className={`flexedContent`}>
                  <div className={style.listItems}>
                      <ul>
                      {data.map((data) => (
                          <li><div><img src={data.img} /><p>{data.currency}</p></div> <p>{ data.default}</p></li>
                          ))}
                      </ul>
                  </div> 


              </div>
        </div>      

      </>
  )
}

export default CurrencyPrefrence