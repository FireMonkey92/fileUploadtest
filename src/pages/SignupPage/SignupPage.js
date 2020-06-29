import React, { Component } from "react";
import { Row, Col, Radio } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Independent from "./Independent/Independent";
import Organization from "./Organization/Organization";
import HeaderVerify from "../../components/HeaderVerify/HeaderVerify";
import User from "./User/User";
import ROUTES from "../../configs/routes";
import _ from "lodash";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import {
  ActionUserRegistration,
  ActionIndependentRegister,
  ActionOrganizationRegister,
  ActionUserUpdate
} from "../../store/actions/actoins-user";
import {
  ActionGetCountry,
  ActionGetState,
  ActionGetCity,
  ActionGetServices,
  ActionGetQualification
} from "../../store/actions/actions-utils-data";
import VerifyPage from "../VerifyPage/VerifyNumber";
import Loading from "../../components/Loading/Loading";
import "./SignupPage.less";
import { ToastContainer } from "react-toastify";
import HeaderLanding from "../../components/HeaderLanding/HeaderLanding";
import Footer from '../../components/Footer/Footer';

/***************************** 
resStatus: "0" - render form 
resStatus: "1" - render verifyPage for user 
                        or render ThanksMessage for provider successfull register
                        based on the user form selection
resStatus: "2" - render verifyPage error in register
*****************************/

class SignupPage extends Component {
  state = {
    value: "",
    mobileNumber: "",
    resStatus: "0"
  };

  componentDidMount() {
    const params = {
      status: 1
    };
    this.props.ActionGetCountry(params);
    this.props.ActionGetServices(params);
    this.props.ActionGetQualification(params);
  }


  componentWillUnmount() {
    const { resStatus } = this.state;
    if (resStatus === "1") {
      this.props.ActionUserUpdate("newUser", undefined)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { user } = nextProps;
    if (user !== undefined) {
      if (user.success)
        return {
          ...prevState,
          resStatus: "1"
        };
      else
        return {
          ...prevState,
          resStatus: "2"
        };
    }
    return prevState;
  }

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  userSubmitAction = data => {
    this.setState({ mobileNumber: data.mobile });
    this.props.ActionUserRegistration(data);
  };
  routeNavigate = location => {
    this.props.ActionRouteNavigate(location);
  };
  getState = id => {
    const params = {
      status: 1,
      countryId: id
    };
    this.props.ActionGetState(params);
  };

  getCity = id => {
    const params = {
      status: 1,
      stateId: id
    };
    this.props.ActionGetCity(params);
  };

  userSubmitIndepedent = data => {

    console.log(data);
    this.setState({
      mobileNumber: data.mobile
    });

    let services = [];
    _.each(data.services, obj => {
      services.push(obj.value);
    });
    const updateData = {
      ...data,
      services
    };
    this.props.ActionIndependentRegister(updateData);
  };

  userSubmitOrganisation = data => {
    this.setState({
      mobileNumber: data.phone
    });

    let services = [];
    _.each(data.services, obj => {
      services.push(obj.value);
    });
    const updateData = {
      ...data,
      services
    };
    this.props.ActionOrganizationRegister(updateData);
  };

  renderProviderFrom = () => {
    return (
      <div className="signup-container">
        <div className="head">
          <h2>Create your Provider account</h2>
          {/* <p>
            Professionally streamline standardized alignments for vertical
            ideas. Phosfluorescently pursue sustainable technologies without
            corporate processes. Credibly re-engineer flexible markets and
            multidisciplinary platforms.{" "}
          </p> */}
        </div>
        <hr />
        <div className="bottom">
          <h4>How you’re going to provide service</h4>
          <div className="choice">
            <Radio.Group
              onChange={this.onChange}
              value={this.state.value}
              prefixCls="choice"
            >
              <Radio value={"independent"}>
                <span className="choice-label">As Independent</span>
              </Radio>
              <Radio value={"organization"}>
                <span className="choice-label">As Organization</span>
              </Radio>
            </Radio.Group>
          </div>
          <hr />
          {this.state.value === "independent" && (
            <div id="individualRegistration">
              <Independent
                country={this.props.utils.country}
                getState={id => this.getState(id)}
                state={this.props.utils.state}
                qualifications={this.props.qualifications}
                city={this.props.utils.city}
                getCity={id => this.getCity(id)}
                userSubmitIndepedent={data => this.userSubmitIndepedent(data)}
                services={this.props.services}
                isloadingState={this.props.isloadingState}
                isloadingCity={this.props.isloadingCity}
                isloadingCountry={this.props.isloadingCountry}
              />
            </div>
          )}
          {this.state.value === "organization" && (
            <div id="orgenizationRegistration">
              <Organization
                country={this.props.utils.country}
                getState={id => this.getState(id)}
                state={this.props.utils.state}
                getCity={id => this.getCity(id)}
                city={this.props.utils.city}
                userSubmitOrganisation={data => this.userSubmitOrganisation(data)}
                services={this.props.services}
                isloadingState={this.props.isloadingState}
                isloadingCity={this.props.isloadingCity}
                isloadingCountry={this.props.isloadingCountry}
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  renderThanksMessage = () => {
    return (
      <div className="thanks thanks-container">
        <div className="logo">
          <img
            src={require("../../assets/images/png/logo_white.png")}
            alt="logo"
          />
        </div>
        <h3>Thanks for registering with us </h3>
        <p>Check your mail, and follow the instructions to log in </p>
        <div className="button" onClick={() => this.routeNavigate(ROUTES.ROOT)}>
          <span className="back_button">
            <img
              src={require("../../assets/images/png/left-arrow.png")}
              alt="back"
            />
          </span>
          <span>Back to Sign in</span>
        </div>
      </div>
    );
  };

  render() {
    const { resStatus } = this.state;
    const { state } = this.props.location;

    if (resStatus === "1" && state && state.SIGNUP === "PROVIDER")
      return (
        <VerifyPage
          userType="Provider"
          mobileNumber={this.state.mobileNumber}
        />
      );
    else if (resStatus === "1" && state && state.SIGNUP === "USER")
      return (
        <VerifyPage userType="User" mobileNumber={this.state.mobileNumber} />
      );
    else
      return (
        <div>
          <HeaderLanding />
          {/* <HeaderVerify  {...this.props} /> */}
          <Row type="flex" justify="center" className="signup signup-page">
            <Col xs={24} sm={22} md={17}>
              {state && state.SIGNUP === "USER" ? (
                <User
                  country={this.props.utils.country}
                  getState={id => this.getState(id)}
                  state={this.props.utils.state}
                  city={this.props.utils.city}
                  getCity={id => this.getCity(id)}
                  userSubmitAction={data => this.userSubmitAction(data)}
                  isloadingState={this.props.isloadingState}
                  isloadingCity={this.props.isloadingCity}
                  isloadingCountry={this.props.isloadingCountry}
                />
              ) : (
                  this.renderProviderFrom()
                )}
            </Col>
          </Row>
          <Footer />
          <ToastContainer />
          <Loading isloading={this.props.isloading} />
        </div>
      );
  }
}

function mapStateToProps({ rUser, rUtils, rLoading }) {
  return {
    user: rUser.newUser,
    utils: rUtils,
    isloading:
      rLoading.signupuser || rLoading.independent || rLoading.organization,
    isloadingState: rLoading.state || false,
    isloadingCity: rLoading.city || false,
    isloadingCountry: rLoading.country || false,
    qualifications: rUtils.qualification || [],
    services: rUtils.services || [],
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionUserRegistration,
      ActionRouteNavigate,
      ActionGetServices,
      ActionGetCountry,
      ActionGetState,
      ActionGetCity,
      ActionIndependentRegister,
      ActionOrganizationRegister,
      ActionGetQualification,
      ActionUserUpdate
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
