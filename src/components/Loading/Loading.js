import React from 'react'
import './Loading.less'

const Loading = ({ isloading }) => {

  if (isloading)
    return (
      <div className="overlay">
        <div id="main">
          <span className="spinner"></span>
        </div>
      </div>

    )
  else
    return null
}

export default Loading
