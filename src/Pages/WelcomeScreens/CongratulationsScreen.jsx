import React from "react";
import style from "./style.module.scss";
import Lottie from "react-lottie-player";
import Congratulations from "../../Assets/JsonFiles/Congratulations.json";

function CongratulationsScreen({ children }) {
  return (
    <div className={style.setPassword__secretPharse}>
      <div className={`${style.cardWhite__beginText} ${style.congratScreen}`}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Lottie
            animationData={Congratulations}
            style={{ width: 190, height: 190 }}
            loop
            play
          />
        </div>
        <h1>Congratulations!</h1>
        <p>Your Wallet is Created.</p>
        {children}
      </div>
    </div>
  );
}

export default CongratulationsScreen;
