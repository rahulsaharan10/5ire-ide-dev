import React from 'react'
import style from './style.module.scss'
function MenuRestofHeaders({title}) {
  return (
    <div className={style.restOfHeaders}>
        <div></div>
        <h4>{title}</h4>
        <div></div>
    </div>
  )
}

export default MenuRestofHeaders