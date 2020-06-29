import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form } from "formik";
import { Row, Col, Table, Drawer, Steps, Divider, Pagination } from "antd";
import { ActionGetAllJobsForAdmin } from "../../../store/actions/actions-utils-data";
import {
  ActionGetJobDetails,
  ActionServerData,
} from "../../../store/actions/actions-server-data";

import InputText from "../../../components/Form/InputText";

import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";
import { UtilsHelper } from "../../../utils/utils-helper";
import {
  browserName,
} from "react-device-detect";
import "./AdminJobOrder.less";

class AdminJobOrder extends Component {
  state = {
    jobs: [],
    visible: false,
    record: undefined,
    totalCount: 0,
    currentPage: 1,
    SelectedJobDetails: [],
  };
  componentDidMount() {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      userId: id,
      pgSkip: 0,
      pgLimit: 10,
      sortBy: "createdDate",
      sortByFlag: 1,
    };
    this.props.ActionGetAllJobsForAdmin(params, header);
  }

  handleDrawer = () => {
    this.setState({ visible: !this.state.visible });
  };
  onClose = () => {
    this.setState({ visible: false, SelectedJobDetails: [] });
    this.props.ActionServerData("jobDetails", undefined);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.jobs) {
      if (nextProps.jobDetails) {
        return {
          ...prevState,
          jobs: nextProps.jobs.jobs,
          SelectedJobDetails: nextProps.jobDetails.jobDetails,
          totalCount: nextProps.jobs.totalCount,
        };
      }
      return {
        ...prevState,
        jobs: nextProps.jobs.jobs,
        totalCount: nextProps.jobs.totalCount,
      };
    }
    return prevState;
  }

  onPageChange = (pageCount) => {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      userId: id,
      pgSkip: (pageCount - 1) * 10,
      pgLimit: 10,
      sortBy: "createdDate",
      sortByFlag: 1,
    };

    this.props.ActionGetAllJobsForAdmin(params, header);
  };
  rowHandler = (record, rowIndex) => {
    return {
      onClick: (event) => {
        const { role, token, id } = this.props.user;
        const header = {
          role,
          "x-access-token": token,
        };
        const params = { userId: id, jobId: record.jobId };
        this.props.ActionGetJobDetails(params, header);
        this.setState({
          visible: true,
          JobID: record.jobId,
          record,
        });
      },
    };
  };

  renderDrawer = () => {
    const SelectedJobDetails = this.state.SelectedJobDetails;
    const { Step } = Steps;
    if (SelectedJobDetails.length !== 0) {
      const {
        serviceName,
        memberName,
        jobId,
        providerName,
        statusId,
        description,
        PayedAmount,
        count,
        GST,
        adminFee,
        serviceCost
      } = SelectedJobDetails;

      const AdminCommission = (Number(adminFee)).toFixed(2)
      const AmountByMember = Number(PayedAmount).toFixed(2)
      const AmountForProvider = Number(serviceCost).toFixed(2)
      const GSTAmount = (Number(PayedAmount) - (Number(serviceCost) + Number(adminFee))).toFixed(2)


      console.log(statusId)
      let StepIndex = statusId;
      if (statusId === 1) {
        StepIndex = 0;
      }
      if (statusId === 4 || statusId === 3) {
        StepIndex = 1;
      }
      if (statusId === 2) {
        StepIndex = 2;
      }
      if (statusId === 6) {
        StepIndex = 3;
      }
      if (statusId === 7) {
        StepIndex = 3;
      }
      if (statusId === 8 || statusId === 9) {
        StepIndex = 4;
      }
      if (statusId === 10) {
        StepIndex = 5;
      }


      let isWebViewFlag = false
      if (browserName === "Chrome WebView" || browserName === "WebKit")
        isWebViewFlag = true;

      return (
        <Drawer
          id="jobOrder_drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <div className="setting-form">
            {this.state.SelectedJobDetails.length != 0 ? (
              <div className="jobOrder_View">
                <Row>
                  <Col sm={12}>
                    <div className="back_button" onClick={this.onClose}>
                      Back
                    </div>
                  </Col>
                  <Col sm={12}>
                    <div className="chat_button" onClick={this.onClose}>
                      <a
                        target={!isWebViewFlag ? '_blank' : '_self'}
                        href="https://talkjs.com/dashboard/login"
                      >
                        See Chat Logs
                      </a>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Row>
                      <Col className="Job_Title">{serviceName}</Col>
                      <Col className="TitleText">Job ID : {jobId}</Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Col className="head_lable">User</Col>
                    <Col className="TitleText">{memberName}</Col>
                  </Col>
                  <Col span={8}>
                    <Col className="head_lable">Provider</Col>
                    <Col className="TitleText">{providerName}</Col>
                  </Col>
                </Row>

                <Divider />

                <Row>
                  <Col span={24} className="head_lable">
                    Job Status
                  </Col>
                  <Col className="TitleText">
                    {
                      UtilsHelper.getAssetsAndColor(statusId)
                        .JobStatusAdminPanel
                    }
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col span={24}>
                    <Steps
                      className={`${
                        statusId === 3 || statusId === 9
                          ? " jobStatusStepsNotOk"
                          : " jobStatusStepsOk"
                        }`}
                      progressDot
                      current={StepIndex}
                    >
                      <Step title="Job Created" />
                      {statusId === 3 ? (
                        <Step title="Rejected by provider" />
                      ) : null}
                      {statusId === 1 ||
                        statusId === 4 ||
                        statusId === 9 ||
                        statusId === 2 ||
                        statusId === 8 ||
                        statusId === 6 ||
                        statusId === 7 ||
                        statusId === 10 ? (
                          <Step title="Accepted by provider" />
                        ) : null}
                      <Step title="Payment" />
                      {statusId === 6 ? (
                        <Step title="Job is on progress" />
                      ) : null}
                      <Step title="Completed" />
                      {statusId === 9 ? (
                        <Step title="Rejected by Member" />
                      ) : null}
                      {statusId === 1 ||
                        statusId === 8 ||
                        statusId === 2 ||
                        statusId === 6 ||
                        statusId === 7 ||
                        statusId === 4 ||
                        statusId === 3 ||
                        statusId === 10 ? (
                          <Step title="Approved by Member" />
                        ) : null}
                      <Step title="close" />
                    </Steps>
                  </Col>
                </Row>
                <Divider />

                <Row>
                  <Col span={24} className="head_lableDarkr">
                    Requests from user
                  </Col>
                  <Col className="TitleTextDarker">{description}</Col>
                </Row>
                <Divider />
                <Row>
                  <Col
                    span={statusId === 8 || statusId === 10 ? 12 : 24}
                    className={`${
                      statusId === 8 || statusId === 10
                        ? "head_lableDarkr SuccessText"
                        : "head_lableDarkr"
                      }`}
                  >
                    Payment Amount : ₹{" "}
                    {statusId === 1 || statusId === 3
                      ? "NA"
                      : PayedAmount.toFixed(2)}
                  </Col>
                  {statusId === 8 || statusId === 10 ? (
                    <Col
                      span={statusId === 8 ? 24 : 12}
                      className="head_lableDarkr SuccessText alignRight"
                    >
                      {`${statusId === 10 ? "Done by Sugam Vyappar" : ""}`}
                    </Col>
                  ) : null}
                  <Col span={12} className="TitleTextDarker">
                    Count : {count}
                  </Col>
                  <Col span={12} className="TitleTextLightRight">
                    Payment Status :{" "}
                    <div>
                      {" "}
                      {
                        UtilsHelper.getAssetsAndColor(statusId)
                          .PaymentStatusAdminPanel
                      }
                    </div>
                  </Col>
                </Row>
                {(statusId === 1 || statusId === 3) ||
                  <>
                    <Divider />
                    <Row>
                      <Col span={20} className="TitleTextLight">
                        GST
                  </Col>
                      <Col span={4} className="head_lableDarkr margin0 alignRight">
                        {GSTAmount}
                      </Col>

                      <Col span={20} className="TitleTextLight">
                        For Provider
                  </Col>
                      <Col span={4} className="head_lableDarkr margin0 alignRight">
                        {AmountForProvider}
                      </Col>

                      <Col span={20} className="TitleTextLight">
                        Commission
                    </Col>
                      <Col span={4} className="head_lableDarkr margin0 alignRight">
                        {AdminCommission}
                      </Col>
                      <Col span={20} className="TitleTextLight">
                        Amount By Member
                  </Col>
                      <Col span={4} className="head_lableDarkr margin0 alignRight">
                        {AmountByMember}
                      </Col>
                    </Row>
                    <Divider />
                    <Row className=" flex-row-center">
                      <Col span={20} className="TitleTextLight">
                        Overall Amount:
                  </Col>
                      <Col span={4} className="head_lableDarkr alignRight">
                        ₹ {PayedAmount.toFixed(2)}
                      </Col>
                    </Row>
                  </>}
              </div>
            ) : null}
          </div>
        </Drawer >
      );
    }
  };

  render() {
    const { jobs } = this.state;
    let JobsDataWithKey = [];
    if (jobs) {
      if (jobs.length > 0) {
        JobsDataWithKey = jobs.map((item) => {
          return {
            ...item,
            key: item.jobId,
          };
        });
      }
    }
    const JobsColumns = [
      // {
      //   title: "S.No.",
      //   dataIndex: "key",
      //   key: "key",
      //   width: "7%",
      //   defaultSortOrder: "descend",
      // },
      {
        title: "JOB ID",
        dataIndex: "jobId",
        width: "15%",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.jobId - b.jobId,
      },
      {
        title: "COUNT",
        dataIndex: "count",
        width: "10%",
        sorter: (a, b) => a.count - b.count,
      },
      {
        title: "DATE",
        dataIndex: "createdDate",
        width: "10%",
        defaultSortOrder: "descend",
        sorter: (a, b) =>
          new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
        render: (data) => {
          let newDate = new Date(data);
          let date = newDate.getDate();
          let month = newDate.toLocaleString("default", { month: "short" });
          let year = newDate.getFullYear();
          return <>{`${date} ${month} ${year}`}</>;
        },
      },
      {
        title: "USER",
        dataIndex: "memberName",
        width: "15%",
      },
      {
        title: "PROVIDER",
        dataIndex: "providerId",
        width: "15%",
      },
      {
        title: "JOB STATUS",
        dataIndex: "statusDescription",
        width: "20%",
        render: (data, row) => {
          return (
            <div
              className={`${
                row.statusId === 10 || row.statusId === 8
                  ? "job_done"
                  : row.statusId === 3 || row.statusId === 9
                    ? "job_rejected"
                    : ""
                }`}
            >{`${data}`}</div>
          );
        },
      },
      {
        title: "AMOUNT",
        dataIndex: "amount",
        width: "10%",
        sorter: (a, b) => a.amount - b.amount,
      },
    ];
    const totalCount = this.state.totalCount;

    return (
      <div>
        <Header {...this.props} />
        <Row type="flex" justify="center" className="Job_Orders">
          <Col xs={23} sm={22} md={22}>
            <div id="tableContainer">
              <Table
                dataSource={JobsDataWithKey}
                columns={JobsColumns}
                onRow={this.rowHandler}
                pagination={false}
                rowClassName={(row, index) => {
                  return 'rowCursorPointer'
                }}
              />

              {JobsDataWithKey.length > 0 && (
                <Pagination
                  defaultCurrent={1}
                  total={totalCount}
                  onChange={this.onPageChange}
                />
              )}
            </div>
          </Col>
          {this.renderDrawer()}
        </Row>
        <Loading isloading={this.props.isloading} />
      </div>
    );
  }
}

function mapStateToProps({ rUtils, rSession, rServerData, rLoading }) {
  return {
    user: rSession,
    jobs: rUtils.allJobAdmin || undefined,
    isloading: rLoading.allJobAdmin || rLoading.jobDetails,
    jobDetails: rServerData.jobDetails,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionGetAllJobsForAdmin,
      ActionGetJobDetails,
      ActionServerData,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminJobOrder);
