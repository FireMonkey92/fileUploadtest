import React, { Component } from "react";
import "./Loading.less";

class LoadingWidgets extends Component {
  render() {
    return (
      <div className="widgets--loading">
        <div className="top">
          <div className="half flex-row">
            <div className="circle"></div>
            <div className="info">
              <div className="line line_half"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="bottom"></div>
      </div>
    );
  }
}

export default LoadingWidgets;
