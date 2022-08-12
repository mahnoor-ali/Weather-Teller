import React from 'react'

export default function Error(props) {
  return (
    <div id="error">
       <div>{props.code}</div>
       <h3>{props.msg}</h3>
       <h4>Please try again later!  
       <button className="refresh" onClick={props.handleRefresh}><i className="bi bi-arrow-clockwise" ></i></button>
       </h4>
    </div>
  )
}
