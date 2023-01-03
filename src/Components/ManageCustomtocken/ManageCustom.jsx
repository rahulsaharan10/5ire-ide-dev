import React from 'react'

function ManageCustom(name,currency,currencyicon) {
  return (
      <>
          <div>
              <div>
                  <img src={currencyicon} />
                  <div>
                      <p>{currency}</p>
                      <span>{name}</span>
                  </div>
              </div>
              
      </div>
      </>
  )
}

export default ManageCustom