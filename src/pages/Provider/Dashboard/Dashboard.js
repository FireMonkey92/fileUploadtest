import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ActionGetProviderDashboardDetails
} from "../../../store/actions/actions-server-data";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./Dashboard.less";

class Dashboard extends Component {
  componentDidMount() {
    const { role, token, id } = this.props.user;
    const Params = id;
    const header = {
      role,
      "x-access-token": token
    };
    this.props.ActionGetProviderDashboardDetails(Params, header);
  }

  renderLoading = num => {
    let array = [];
    for (let i = 0; i < num; i++) array.push(i);
    return (
      <Row type="flex" justify="start">
        {array.map((item, index) => (
          <Col
            xs={24}
            sm={22}
            md={12}
            lg={8}
            className="loading-dashboard-card"
            key={index}
          >
            <div className="container">
              <div className="top">
                <div className="block"></div>
                <div className="line"></div>
              </div>
              <div className="bottom">
                <div className="line"></div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    );
  };

  renderOverview = () => {
    const { providerDashboardDetails } = this.props;

    if (providerDashboardDetails.length > 0)
      return (
        <Row type="flex" justify="start">
          <Col xs={24} sm={12} md={12} lg={8} className="dashboard-card">
            <div className="container">
              <div className="top">
                <img
                  src={require("../../../assets/images/png/add-file.png")}
                  alt="add-file"
                />
                <div className="title orange">Job Order</div>
              </div>
              <div className="bottom">
                <div className="title">New Job Order</div>
                <div className="count">{providerDashboardDetails[0].Saved}</div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} className="dashboard-card">
            <div className="container">
              <div className="top">
                <img
                  src={require("../../../assets/images/png/on_process.png")}
                  alt="process file"
                />
                <div className="title purple">On going Jobs</div>
              </div>
              <div className="bottom">
                <div className="title">Yet to Complete</div>
                <div className="count">
                  {providerDashboardDetails[0].InProgress}
                </div>
              </div>
            </div>
          </Col>
          {/* <Col xs={22} sm={22} md={12} lg={8} className="dashboard-card">
                        <div className="container">
                            <div className="top">
                                <img src={require('../../../assets/images/png/three-quarters-of-an-hour.png')} alt="three-quarters-of-an-hour" />
                                <div className="title green">Waiting for Approval</div>
                            </div>
                            <div className="bottom">
                                <div className="title ">Yet to Acknowledge</div>
                                <div className="count">01</div>
                            </div>
                        </div>
                    </Col> */}
          <Col xs={24} sm={12} md={12} lg={8} className="dashboard-card">
            <div className="container">
              <div className="top">
                <img
                  src={require("../../../assets/images/png/three-quarters-of-an-hour.png")}
                  alt="success file"
                />
                <div className="title green">Waiting for payment</div>
              </div>
              <div className="bottom">
                <div className="title">Overall waiting payment</div>
                <div className="count">
                  {providerDashboardDetails[0].MemberAccept}
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} className="dashboard-card">
            <div className="container">
              <div className="top">
                <img
                  src={require("../../../assets/images/png/successfully_done.png")}
                  alt="success file"
                />
                <div className="title successFont">Successfully Done!</div>
              </div>
              <div className="bottom">
                <div className="title">Overall Job completion</div>
                <div className="count">
                  {providerDashboardDetails[0].Completed}
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} className="dashboard-card">
            <div className="container">
              <div className="top">
                <img
                  src={require("../../../assets/images/png/reject.png")}
                  alt="process file"
                />
                <div className="title red">Rejected By Member</div>
              </div>
              <div className="bottom">
                <div className="title">Overall Rejected By Member</div>
                <div className="count">
                  {providerDashboardDetails[0].MemberReject}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      );
    else return this.renderLoading(5);
  };

  renderReport = () => {
    const { providerDashboardDetails } = this.props;

    if (providerDashboardDetails.length > 0)
      return (
        <Row type="flex" justify="start">
          <Col xs={24} sm={12} md={12} lg={8} className="dashboard-card">
            <div className="container">
              <div className="top">
                <div className="title">
                  Total Amount earned in sugam vyappar
                </div>
              </div>
              <div className="bottom">
                <div className="title">Total Earnings</div>
                <div className="price">
                  ₹ {providerDashboardDetails[0].totalAmount}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      );
    else return this.renderLoading(3);
  };

  render() {
    return (
      <div>
        <Header {...this.props} />
        <Row type="flex" justify="center" className="provider_dashboard">
          <Col xs={23} sm={22} md={22} lg={17}>
            <div className="header_title">Overview</div>
            {this.renderOverview()}
            <div className="header_title">Report</div>
            {this.renderReport()}
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ rSession, rLoading, rServerData }) {
  return {
    user: rSession,
    isloading: rLoading.providerDashboardDetails,
    providerDashboardDetails: rServerData.providerDashboardDetails || []
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionGetProviderDashboardDetails,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
