import React from 'react'
import style from './style.module.scss'

function ButtonComp({text,bordered,onClick,maxWidth}) {
  return (
    <button className={`${style.ButtonStyle} ${bordered ? style.ButtonStyle__bordered : ""}`} onClick={onClick} style={{maxWidth: maxWidth}}>
        {text}
    </button>
  )
}

export default ButtonComp