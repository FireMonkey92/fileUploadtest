import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "antd";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import {
  ActionCreateJob,
  ActionClearUser,
} from "../../store/actions/actoins-user";
import { ActionGetServiceByProvider } from "../../store/actions/actions-server-data";
import { ActionGetPriceConstants } from "../../store/actions/actions-utils-data";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ROUTES from "../../configs/routes";
import Loading from "../../components/Loading/Loading";
import CreateJobForm from "./CreateJobForm/CreateJobForm";
import _ from "lodash";
import Modal from "react-modal";

import "./CreateJobs.less";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "500px",
    height: "400px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    transition: "all 0.6s ease-in",
  },
};

class CreateJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: this.props.location.state.provider,
      status: 0,
      serviceByProvider: [],
      servicesData: [],
      summary: "",
      count: 1,
      gst: 0,
      ErrorModal: false,
      adminFees: undefined,
    };
  }

  componentDidMount() {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    let providerId;
    if (this.props.location.state)
      providerId = this.props.location.state.provider.providerId;
    this.props.ActionGetServiceByProvider(providerId, header);
    this.props.ActionGetPriceConstants();
  }

  static getDerivedStateFromProps(props, state) {
    const { createJob, serviceByProvider, priceConstants } = props;
    // if (createJob !== undefined)
    //   if (createJob.success && state.status === 1) {
    //     props.ActionRouteNavigate(ROUTES.JOBS);
    //   } else if (props.isloading === true)
    //     return {
    //       ...state,
    //       status: 1
    //     };
    if (serviceByProvider !== undefined && priceConstants !== undefined) {
      let GSTAMT;
      let ADMINFEES;
      const filtereGST = _.filter(priceConstants.data, (obj) => obj.id === 1);
      const filtereAdminFees = _.filter(
        priceConstants.data,
        (obj) => obj.id === 2
      );

      if (filtereGST[0].id === 1) {
        GSTAMT = filtereGST[0].value;
      }
      if (filtereAdminFees[0].id === 2) {
        ADMINFEES = filtereAdminFees[0].value;
      }
      let gst = GSTAMT;
      if (serviceByProvider.length > 0) {
        let servicesData = [];
        _.each(serviceByProvider, (i) => {
          servicesData.push({ label: i.serviceName, value: i.serviceId });
        });
        return {
          ...state,
          servicesData,
          serviceByProvider,
          gst,
          adminFees: ADMINFEES,
        };
      }
    }
    return state;
  }

  handleJobCreate = (obj) => {
    const { role, token, id } = this.props.user;
    const { providerId } = this.state.provider;
    const { serviceByProvider } = this.props;

    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      ...obj,
      memberId: id,
      providerId: providerId,
    };
    let doesCreateJob = false;
    let newArray = _.filter(serviceByProvider, (ob) => {
      return ob.serviceId === obj.serviceId;
    })[0];
    doesCreateJob = newArray.price <= 0 ? false : true;

    doesCreateJob
      ? this.props.ActionCreateJob(params, header)
      : this.setState({ ErrorModal: true });
  };

  closeModal = () => {
    this.setState({ ErrorModal: false });
  };

  onChange = (name, value) => {
    let service = [];
    if (name === "serviceId")
      service = _.filter(this.props.serviceByProvider, (obj) => {
        return obj.serviceId === value;
      });

    if (name === "serviceId") {
      const totalAmount = 1 * service[0].totalPrice;
      this.setState({
        service,
        serviceName: service[0].serviceName,
        count: 1,
        totalAmount,
      });
    } else {
      this.setState({
        [name]: value,
        totalAmount: this.state.service
          ? value * this.state.service[0].totalPrice
          : 0,
      });
    }
  };

  render() {
    const {
      count,
      serviceName,
      totalAmount,
      gst,
      servicesData,
      provider,
      adminFees,
    } = this.state;

    // const totalAdminTax = (totalAmount * adminFees) / 100;
    const subTotalForGSTCalculation = totalAmount;
    const totalGST = (subTotalForGSTCalculation * gst) / 100;
    const subTotalToBePaid = totalAmount + totalGST;

    return (
      <div>
        <Header {...this.props} />
        <Row type="flex" justify="center" className="CJ CJ-page">
          <Col xs={23} sm={22} md={17}>
            <h2 className="page-heading">Create Job</h2>
            <div className="CJ-body">
              <div className="steps-content">
                <div className="flex">
                  <CreateJobForm
                    services={{ data: servicesData }}
                    provider={provider}
                    onChangeCount={this.onChangeCount}
                    onChange={this.onChange}
                    handleJobCreate={this.handleJobCreate}
                  />
                  <div className="right">
                    <div className="joborder">
                      <h3>Job order summary</h3>
                      {this.state.service && (
                        <div
                          className="joborder-body"
                          style={{
                            height: this.state.service ? "325px" : 0,
                            transition: "all 0.5s linear",
                          }}
                        >
                          <h4>{serviceName} </h4>
                          <p className="count">
                            <span>Count : {count}</span>
                            <span className="dark">
                              ₹ {(totalAmount).toFixed(2)}
                            </span>
                          </p>
                          <p>
                            <span>GST {`@${gst}%`}</span>
                            <span>+ ₹ {totalGST.toFixed(2)}</span>
                          </p>
                          <div className="totalorder">
                            <p>
                              <span>Total </span>
                              <span>₹ {subTotalToBePaid.toFixed(2)}</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.ErrorModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="CJ_modal_responsive"
          overlayClassName="ReactModal_Overly"
          ariaHideApp={false}
          contentLabel="Create Job Modal"
        >
          <div className="CJ_modal">
            <img
              src={require("../../assets/images/png/report.png")}
              alt="Report"
              style={{ width: 70, height: 70 }}
            />
            <h3>Sorry for the inconvenience</h3>
            <p>
              Selected Provider has not yet added the fees for the this
              particular service.
            </p>
            <p>Kindly Check the other providers.</p>
            <button onClick={() => this.props.ActionRouteNavigate(ROUTES.HOME)}>
              Home
            </button>
          </div>
        </Modal>
        <Loading isloading={this.props.isloading} />
        <Footer />
      </div>
    );
  }
}
function mapStateToProps({ rSession, rUser, rLoading, rServerData, rUtils }) {
  return {
    user: rSession,
    serviceByProvider: rServerData.serviceByProvider,
    isloading:
      rLoading.createJob ||
      rLoading.serviceByProvider ||
      rLoading.priceConstants,
    createJob: rUser.createJob,
    priceConstants: rUtils.priceConstants || undefined,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionRouteNavigate,
      ActionGetServiceByProvider,
      ActionCreateJob,
      ActionClearUser,
      ActionGetPriceConstants,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobs);
