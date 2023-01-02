import React from 'react'
import MenuRestofHeaders from '../../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders'
import ButtonComp from '../../../Components/ButtonComp/ButtonComp'
import { InputField, InputFieldOnly } from '../../../Components/InputField/InputFieldSimple'
import style from './style.module.scss'

function SendCoins() {
  return (
    <div className={`scrollableCont ${style.send}`}>
      <MenuRestofHeaders backTo={"/send"} title={"Send BTC"} />
      <div className={`flexedContent`}>
        <InputField placeholder={"Wallet Address"} label="Address" addonAfter={<span className={style.send__pasteText}>Paste</span>} />
        <InputFieldOnly placeholder={"Token Name"} label="Amount" />
        <div className={style.send__infoText}>
        0 BTC ~ $88.02
        </div>
        <ButtonComp
            //   onClick={() => setActiveTab("secretPhrase")}
              text={"Continue"}
              maxWidth={"100%"}
            />
      </div>
    </div>
  )
}

export default SendCoins