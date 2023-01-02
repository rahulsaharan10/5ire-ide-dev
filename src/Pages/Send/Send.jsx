import React from 'react'
import MenuRestofHeaders from '../../Components/BalanceDetails/MenuRestofHeaders/MenuRestofHeaders'
import style from './style.module.scss'
function Send() {
  return (
    <div className={`scrollableCont ${style.send}`}>
        <MenuRestofHeaders backTo={"/"} title={"Send"} searchTo="/" />
        <div className={`flexedContent`}>
           <div> <div>span</div></div>
        </div>
    </div>
  )
}

export default Send