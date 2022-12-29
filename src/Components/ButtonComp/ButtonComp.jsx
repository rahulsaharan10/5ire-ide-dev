import React from 'react'
import style from './style.module.scss'

function ButtonComp({text,bordered,onClick}) {
  return (
    <button className={`${style.ButtonStyle} ${bordered ? style.ButtonStyle__bordered : ""}`} onClick={onClick}>
        {text}
    </button>
  )
}

export default ButtonComp