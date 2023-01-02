import Link from 'antd/es/typography/Link';
import React from 'react'
import ticketcheck from "../../Assets/TickIcon.svg";
import style from "./style.module.scss"

function SettingList(props) {
    const {
        setinglist,arrowright
    } = props
  return (
      <>
          <Link to="#">
          <div className={style.settingList}>
              <div className={style.settingList__imgValue}>
                  <img src={ticketcheck} />
                  <p>{setinglist}</p>
                  </div>
                  {arrowright ? (
                      <img src={ticketcheck} />
                  ): null}
              </div>
              </Link>
      
      
      </>
  )
}

export default SettingList