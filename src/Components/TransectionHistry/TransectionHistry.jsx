import React from 'react';
import style from "./style.module.scss";
function TransectionHistry(props) {

    const {timing,img,swap,recievedSend,status5ire,status}=props
  return (
    <div className={style.transectionHistry}>
    <p className={style.transectionHistry__dateTime}>
     {timing}
    </p>
    <div className={style.transectionHistry__histry}>
      <div className={style.transectionHistry__histry__status}>
        <img alt="currency" src={img} />
        <div>
          <p>{swap}</p>
          <p>{recievedSend}</p>
        </div>
      </div>
      <div className={style.transectionHistry__histry__success}>
        <p> {status5ire}</p>
        <p>
          Status : <span>{status}</span>
        </p>
      </div>
    </div>
  </div>
  )
}

export default TransectionHistry