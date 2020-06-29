import React, { Component } from "react";
import Header from "../../../components/Header/Header";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";

import { Row, Col } from "antd";
import Footer from "../../../components/Footer/Footer";
import Loading from "../../../components/Loading/Loading";
import {
  ActionGetServices,
  ActionGetCountry,
  ActionGetState,
  ActionGetCity,
  ActionGetQualification,
} from "../../../store/actions/actions-utils-data";
import {
  ActionGetUserDetails,
  ActionUpdateProviderProfile,
  ActionUpdateOrgenizationProfile,
  ActionUploadFile,
} from "../../../store/actions/actoins-user";

import Independent from "../../SignupPage/Independent/Independent";
import Organization from "../../SignupPage/Organization/Organization";

import "./ProviderMyAccount.less";
import AvatarUpload from "../../../components/Form/AvatarUpload";

class ProviderMyAccount extends Component {
  state = {
    value: "",
    mobileNumber: "",
    resStatus: "0",
    country: [],
    city: [],
    states: [],
    services: [],
    qualification: [],
    userDetails: {},
  };

  componentDidMount() {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    this.props.ActionGetUserDetails(id, header);
    this.props.ActionGetCountry();
    this.props.ActionGetServices();
    this.props.ActionGetQualification();
  }

  getState = (id) => {
    const params = {
      status: 1,
      countryId: id,
    };
    this.props.ActionGetState(params);
  };

  getCity = (id) => {
    const params = {
      status: 1,
      stateId: id,
    };
    this.props.ActionGetCity(params);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { user, rUtils, userDetails } = nextProps;
    if (
      user !== undefined &&
      rUtils.country !== undefined &&
      rUtils.services !== undefined &&
      rUtils.qualification !== undefined &&
      userDetails !== undefined
    ) {
      if (rUtils.state === undefined && rUtils.city === undefined) {
        const { countryId, stateId } = userDetails;
        const params = {
          status: 1,
          countryId,
        };
        nextProps.ActionGetState(params);
        const params2 = {
          status: 1,
          stateId: stateId,
        };
        nextProps.ActionGetCity(params2);
      }
      if (
        user.success &&
        rUtils.state !== undefined &&
        rUtils.city !== undefined
      ) {
        let services = [];
        let Bmonth,
          Bdate,
          Byear,
          monthNum = "";
        if (userDetails.services !== "" || userDetails.services !== undefined) {
          let UserServices = JSON.parse(userDetails.services);
          UserServices.map((item) => {
            let obj = {
              value: item.serviceId,
              label: item.serviceName,
              id: item.serviceId,
            };
            services.push(obj);
          });
        }
        if (userDetails.dob !== undefined) {
          const dobString = userDetails.dob;
          if (userDetails.dob) {
            const frstInd = dobString.indexOf("-");
            const lastInd = dobString.lastIndexOf("-");
            monthNum = moment(dobString).format("M");
            Bdate = dobString.slice(0, frstInd);
            Bmonth = dobString.slice(frstInd + 1, lastInd);
            Byear = dobString.slice(lastInd + 1, dobString.length);
          }
        }
        const newUserDetailObj = {
          ...userDetails,
          Bdate,
          Bmonth,
          monthNum,
          Byear,
          services,
        };
        return {
          ...prevState,
          value: user.role,
          country: rUtils.country,
          city: rUtils.city,
          states: rUtils.state,
          qualification: rUtils.qualification,
          services: rUtils.services,
          userDetails: newUserDetailObj,
        };
      } else
        return {
          ...prevState,
        };
    }
    return prevState;
  }

  userSubmitIndepedent = (values) => {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      ...values,
      id: id,
    };

    this.props.ActionUpdateProviderProfile(params, header);
  };

  userSubmitOrganisation = (values) => {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      ...values,
      id: id,
    };
    this.props.ActionUpdateOrgenizationProfile(params, header);
  };

  removeProfileImage = () => {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      userId: id,
      flag: "P",
      fileName: id,
      base64Content: "",
    };
    this.props.ActionUploadFile(params, header);
  };
  render() {
    const {
      value,
      country,
      city,
      states,
      qualification,
      services,
      userDetails,
    } = this.state;
    return (
      <div>
        <Header {...this.props} />
        <Row type="flex" justify="center" className="home_body providerMyACc">
          <Col lg={17} xs={23} sm={22} md={22}>
            <h2 className="prov_my_acc">My Account</h2>
            <div className="form-container Independent">
              <div className="Independent-form">
                {this.state.value === "Provider" && (
                  <div id="individualRegistration">
                    <Independent
                      previousData={userDetails}
                      disableFields={true}
                      removeProfileImage={this.removeProfileImage}
                      country={country}
                      getState={(id) => this.getState(id)}
                      state={states}
                      qualifications={qualification}
                      city={city}
                      getCity={(id) => this.getCity(id)}
                      userSubmitIndepedent={(values) =>
                        this.userSubmitIndepedent(values)
                      }
                      services={services}
                    />
                  </div>
                )}
                {this.state.value === "Organization" && (
                  <div id="orgenizationRegistration">
                    <Organization
                      previousData={userDetails}
                      country={country}
                      removeProfileImage={this.removeProfileImage}
                      disableFields={true}
                      getState={(id) => this.getState(id)}
                      state={states}
                      getCity={(id) => this.getCity(id)}
                      city={city}
                      userSubmitOrganisation={(data) =>
                        this.userSubmitOrganisation(data)
                      }
                      services={services}
                    />
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Footer />
        <Loading isloading={this.props.isLoading} />
      </div>
    );
  }
}

function mapStateToProps({ rSession, rUtils, rLoading, rUser, rServerData }) {
  return {
    user: rSession,
    rUtils: rUtils,
    userDetails: rUser.userDetails,
    isLoading:
      rLoading.userDetails ||
      rLoading.services ||
      rLoading.country ||
      rLoading.state ||
      rLoading.city ||
      rLoading.qualification ||
      rLoading.updateProviderProfile ||
      rLoading.updateOrgenizationProfile ||
      rLoading.uploadFile,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionGetServices,
      ActionGetCountry,
      ActionGetState,
      ActionGetCity,
      ActionGetQualification,
      ActionGetUserDetails,
      ActionUpdateProviderProfile,
      ActionUpdateOrgenizationProfile,
      ActionUploadFile,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderMyAccount);
