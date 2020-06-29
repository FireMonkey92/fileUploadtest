import React from "react";
import "./Job.less";
import cl from "classnames";
import { Col, Row } from 'antd';
import { UtilsHelper } from "../../utils/utils-helper";

class Job extends React.Component {
  changeJobStatus = (jobId, statusId) => {
    this.props.changeJobStatus(jobId, statusId);
  };

  handleJobClick = (job, customData) => {
    const jobDetails = {
      ...job,
      color: customData.cls
    };
    // if (this.props.role === 'Provider')
    this.props.handleJobClick(jobDetails);
  };

  renderStatus = (job, customData) => {
    return (
      <div className={cl("status_container", customData.cls || "")}>
        <div className="flex-row">
          <img
            src={require(`../../assets/images/png/${customData.image}`)}
            alt="status"
          />
          <div className="flex-column">
            <h3 className={cl(customData.cls || "")}>
              {this.props.role !== "Member"
                ? customData.providerMessage
                : customData.memberMessage}
            </h3>
            <span className="dark">{`Job ID : ${job.jobId}`}</span>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { job, role } = this.props;
    const pointer = role === "Provider" ? "pointer" : "";
    const customData = UtilsHelper.getAssetsAndColor(job.statusId);

    return (
      <div className={cl("job job-container", pointer || "")}>
        <div className="job-single_container">
          <div className="content">
            <div className="title">{job.serviceName}</div>
            <div className="title"> Date : {job.createdDate}</div>
          </div>
          <div className="content">
            <div className="title">
              {role === "Provider" ? "Customer" : "Provider"}
            </div>
            <span>{role === "Member" ? job.providerName : job.memberName}</span>
          </div>
          <div className="content countSmall">
            <span> Count</span>
            <div className="title">{job.counts} </div>
          </div>
          <div className="content">
            <span>Payment</span>
            <div className="title">₹ {job.PayedAmount}</div>
          </div>
          <div className="flex-row flexThree">
            <div className={`status ${[customData.cls]}`}>
              {this.renderStatus(job, customData)}
            </div>
            <div className={`button-group ${[customData.cls]}`}>
              {job.nextAction.map((item, i) => {
                if (item.label !== "")
                  return (
                    <button
                      className={[customData.cls]}
                      key={i}
                      onClick={() => this.changeJobStatus(job.jobId, item.id)}
                    >
                      {item.label}
                    </button>
                  );
                else
                  return (
                    <span key={i} className={[customData.cls]}>
                      {customData.AcknowledgeMessage}
                    </span>
                  );
              })}
            </div>
          </div>
        </div>
        {
          role !== "Member" && (
            <div
              className="menu"
              onClick={() => this.handleJobClick(job, customData)}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          )
        }
      </div >
    );
  }
}
export default Job;
