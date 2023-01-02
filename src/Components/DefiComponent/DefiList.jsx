import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.scss'
function DefiList() {
  return (
      <>
          <div className='defiList'>
              <div className='defiList__header'>
                  <h1>Staking Section</h1>
                  <Link to="#" >See More</Link>
              </div>
              <div className='defiList__stakingList'>
                 <img src='' /> <div><h2>Pancake Staking</h2><p>It is a long established fact that a reader.....</p></div>
              </div>
      </div>
      
      </>
  )
}

export default DefiList