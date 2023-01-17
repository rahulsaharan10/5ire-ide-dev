import React from 'react'
import Facebook from "../../Assets/PNG/facebook.png";
import Linkdin from "../../Assets/PNG/linkdin.png";
import Instagram from "../../Assets/PNG/instagram.png";
import style from "./style.module.scss"
function SocialAccount() {
  return (
      <>
          <h1>Social Accounts</h1>
          <div className={style.social}>
              <img src={Facebook}></img>
              <img src={Linkdin}></img>
              <img src={Instagram}></img>
              <img src={Facebook}></img>
              <img src={Linkdin}></img>
              <img src={Instagram}></img>
      </div>
      </>
  )
}

export default SocialAccount