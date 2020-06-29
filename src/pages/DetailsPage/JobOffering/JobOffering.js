import React, { Component } from "react";
import "./JobOffering.less";
import { Row, Col } from "antd";

class JobOffering extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    console.log("start discussion clicked");
  }
  render() {
    const services = this.props.services || [];
    return (
      <div className="joboffer">
        <div className="joboffer-header">
          <h2>Job Offering</h2>
        </div>
        <div className="joboffer-body flex">
          {services.length > 0 &&
            services.map((item, key) => {
              return (
                <div key={key} className="flexbox">
                  <div className="single_job_container">
                    <div className="title">
                      {item.name.split(" ").map((i, index) => (
                        <p key={index}>{i}</p>
                      ))}
                    </div>
                    <div
                      className="start_discuss align-center"
                      onClick={(e) => this.handleClick(e)}
                    >
                      ₹{Number(item.price)}
                      {/* <img src={require('../../../assets/images/png/right-arrow-3-copy@3x.png')} alt='right-arrow' /> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default JobOffering;
