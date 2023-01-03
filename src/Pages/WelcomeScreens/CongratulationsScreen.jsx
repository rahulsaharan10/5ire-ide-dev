import React from "react";
import style from "./style.module.scss";
import Lottie from "react-lottie-player";
import Congratulations from '../../Assets/JsonFiles/Congratulations.json'

function CongratulationsScreen({ children }) {
  return (
    <div className={style.setPassword__secretPharse}>
      <div style={{display:"flex", justifyContent:"center"}}>
      <Lottie
          animationData={Congratulations}
          style={{ width: 190, height: 190 }}
          loop
          play
        />
        </div>
      <p className={style.setPassword__secretPharse__grayText} style={{marginBottom:'36px'}}>
      Your Wallet has been created!
      </p>
      {children}
    </div>
  );
}

export default CongratulationsScreen;
