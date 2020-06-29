import React, { Component } from "react";
import HeaderVerify from "../../components/HeaderVerify/HeaderVerify";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReCAPTCHA from "react-google-recaptcha";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import {
  ActionAuthenticate,
  ActionLogin,
  ActionUserUpdate
} from "../../store/actions/actoins-user";
import VerifyPage from "../VerifyPage/VerifyNumber";
import { Link } from "react-router-dom";
import ROUTES, { buildRoute } from "../../configs/routes";
import InputText from "../../components/Form/InputText";
import { SignInNewValidation, SignInNewValidationWithOTP } from "../../utils/utils-validation";
import { URL_MAP } from "../../constants/urls";
import ModalSignUp from "../../components/ModalSignUp/ModalSignUp";
import Loading from "../../components/Loading/Loading";
import HeaderLanding from "../../components/HeaderLanding/HeaderLanding";
import Footer from "../../components/Footer/Footer";
import localization from '../../localization'
import { config } from '../../configs'
const { footerContent } = localization.eng
import {
  browserName,
} from "react-device-detect";
import "./SigningInNew.less";

const { SITE_KEY } = config;

class SigningInNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      mobileFieldDisabled: false,
      authResponceMessage: "",
      modalIsOpen: false,
      mobile: '',
      isCapchaVerefied: false,
      resendCapchaFlag: false
    };
  }

  routeNavigation = loaction => {
    this.props.ActionRouteNavigate(loaction);
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.authenticationResponce) {
      return {
        ...prevState,
        isAuthenticated: nextProps.user.authenticationResponce.success || false,
        mobileFieldDisabled:
          nextProps.user.authenticationResponce.success || false,
        authResponceMessage: nextProps.user.authenticationResponce.message || ""
      };
    }
    return null;
  }

  componentWillUnmount() {
    this.props.ActionUserUpdate("authenticationResponce", undefined)
  }


  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  GoToUserSignUp = () => {
    this.props.ActionRouteNavigate(buildRoute(URL_MAP.SIGNUP), {
      SIGNUP: "USER"
    });
  };

  GoToProviderSignUp = () => {
    this.props.ActionRouteNavigate(buildRoute(URL_MAP.SIGNUP), {
      SIGNUP: "PROVIDER"
    });
  };

  enableGoogleCapacha = () => {
    this.setState({ isCapchaVerefied: false, resendCapchaFlag: true });
  }
  reSend = () => {
    if (this.state.mobile.length === 10) {
      const bodyParams = {
        mobileNumber: this.state.mobile
      };
      this.props.ActionAuthenticate(bodyParams);
    }
  };

  render() {
    const { authenticationResponce } = this.props.user

    let isWebViewFlag = false
    if (browserName === "Chrome WebView" || browserName === "WebKit")
      isWebViewFlag = true;

    if (authenticationResponce) {
      if (!authenticationResponce.isMobileVerified && authenticationResponce.message === "Mobile number Not verified")
        return (
          <VerifyPage userType="User" verifyFromLogin={true} mobileNumber={this.state.mobile} />
        )
    }
    return (
      <div>
        <HeaderLanding />
        {/* <HeaderVerify {...this.props} /> */}
        {/* <div className="loadimage"> <img src={companyLogoImage}  alt=''/> </div>  : */}
        <Row type="flex" justify="center" >
          <Col xs={24} sm={22} md={17} lg={17}>
            <div className="signnew">
              <div className="signnew-container">
                <div className="center">
                  <div className="loginlogo">
                    <img src={require('../../assets/images/png/sugam-logo@3x.png')} alt="logo" />
                  </div>
                  <h1>Financing at ease!</h1>
                  <p>
                    New to Sugam Vyappar,{" "}
                    <span onClick={this.openModal}>Sign up here </span>{" "}
                  </p>

                  <div>
                    {" "}
                    <h2>Sign In </h2>
                  </div>

                  <div className="MobileInput">
                    <div className="SigninnewMobile">
                      <Formik
                        initialValues={{
                          mobile: "",
                          otp: ""
                        }}
                        validationSchema={this.state.isAuthenticated ? SignInNewValidationWithOTP : SignInNewValidation}
                        onSubmit={(
                          values,
                          { setErrors, validateForm, setSubmitting }
                        ) => {
                          validateForm();
                          // get OTP api call
                          if (values.mobile.length === 10 && values.otp.length <= 5) {
                            const bodyParams = {
                              mobileNumber: values.mobile
                            };
                            this.props.ActionAuthenticate(bodyParams);
                          }
                          // login api call
                          if (values.mobile.length === 10 && values.otp.length === 6) {
                            const loginParams = {
                              mobileNumber: values.mobile,
                              password: values.otp
                            };
                            this.props.ActionLogin(loginParams);
                          }
                        }
                        }
                        render={({
                          values,
                          handleChange,
                          handleBlur,
                          setFieldValue,
                          errors
                        }) => {
                          return (
                            <Form className="mobile">
                              <InputText
                                label=" "
                                name="mobile"
                                type="text"
                                value={values.mobile}
                                disabled={this.state.mobileFieldDisabled}
                                err={errors.mobile}
                                onChange={(e, value) => {
                                  this.setState({ mobile: e.target.value })
                                  handleChange(e);
                                }}
                                onBlur={handleBlur}
                                placeholder="Enter Mobile Number"
                                maxLength={10}
                              />
                              <div className="googleCapcha">
                                {!this.state.isCapchaVerefied && values.mobile.length === 10 ? < ReCAPTCHA
                                  sitekey={SITE_KEY}
                                  onErrored={() => {
                                    this.setState({ isCapchaVerefied: false })
                                  }}
                                  onChange={(value) => {
                                    if (value) {
                                      // on sucees of capcha verification
                                      if (value !== null) {
                                        if (this.state.resendCapchaFlag) {
                                          this.reSend();
                                          setTimeout(() => {
                                            this.setState({ isCapchaVerefied: true, resendCapchaFlag: false })
                                          }, 1500);
                                        }
                                        else {
                                          setTimeout(() => {
                                            this.setState({ isCapchaVerefied: true, resendCapchaFlag: false })
                                          }, 1500);
                                        }

                                      }
                                    }
                                  }}
                                /> : null}
                              </div>
                              {this.state.isAuthenticated ? (
                                <InputText
                                  name="otp"
                                  type="password"
                                  placeholder="Enter the OTP"
                                  value={values.otp}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  err={errors.otp}
                                  maxLength={6}
                                />
                              ) : null}
                              <div className="mobilesubmit">
                                {this.state.isAuthenticated ? (
                                  <button
                                    disabled={this.props.isLogingIn}
                                    className="mobilebutton"
                                    type="submit"
                                  >
                                    Log in
                                  </button>
                                ) : (
                                    <button
                                      disabled={!this.state.isCapchaVerefied}
                                      type="submit"
                                      className={`mobilebutton ${!this.state.isCapchaVerefied && 'disabled'}`}
                                    >
                                      Get OTP
                                    </button>
                                  )}
                              </div>
                              <hr />

                            </Form>
                          );
                        }}
                      />
                      {this.state.isAuthenticated ? (
                        <p>
                          Did’nt get the OTP ? {" "}
                          <button
                            type="reset"
                            onClick={this.enableGoogleCapacha}
                            className="resendButton"
                          >
                            <span>{" "}Re-send</span>
                          </button>
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="socialmobile">
                    <div className="facebook">
                      <a target={!isWebViewFlag ? '_blank' : '_self'} href={footerContent.socialLinks.facebook} >Facebook</a>
                    </div>
                    <div className="twitter">
                      <a target={!isWebViewFlag ? '_blank' : '_self'} href={footerContent.socialLinks.twitter} >Twitter</a>
                    </div>
                    <div className="linkedin">
                      <a target={!isWebViewFlag ? '_blank' : '_self'} href={footerContent.socialLinks.linkdin} >LinkedIn</a>
                    </div>
                  </div>

                  <div className="financetext">
                    <div className="allfinance">
                      All your financial<br />
                      needs at your hand!
                  </div>
                    <div className="subtext">
                      Welcome to Sugam Vyappar, Find the Best Financial Service Providers Near You. Enthusiastically procrastinate viral potentialities after virtual materials. Rapidiously pontificate granular architectures and professional sources.
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Footer />
        <ModalSignUp
          open={this.state.modalIsOpen}
          close={this.closeModal}
          user={this.GoToUserSignUp}
          provider={this.GoToProviderSignUp}
        />
        <Loading
          isloading={this.props.isAuthenticating || this.props.isLogingIn}
        />
      </div>
    );
  }
}
function mapStateToProps({ rUser, rLoading, rSession }) {
  return {
    user: rUser,
    authSession: rSession,
    isLogingIn: rLoading.login,
    isAuthenticating: rLoading.authenticate || false
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionRouteNavigate,
      ActionAuthenticate,
      ActionLogin,
      ActionUserUpdate
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SigningInNew);
