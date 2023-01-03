import Link from 'antd/es/typography/Link';
import React from 'react'
import ticketcheck from "../../Assets/TickIcon.svg";
import style from "./style.module.scss"

function SettingList(props) {
    const {
        setinglist
    } = props
  return (
      <>
          <Link to="#">
          <div className={style.settingList}>
              <div className={style.settingList__imgValue}>
                  <img src={ticketcheck} />
                  <p>{setinglist}</p>
                  </div>
                
                      <img src={ticketcheck} />
                 
              </div>
              </Link>
      
      
      </>
  )
}

export default SettingList