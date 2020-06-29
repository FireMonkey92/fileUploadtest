import React, { Component } from 'react'
import './VerifyNumber.less'
import { Formik, Form } from 'formik';
import InputText from '../../components/Form/InputText';
import { OTPFormValid } from '../../utils/utils-validation';
import { connect } from 'react-redux'
import { ActionVerifyMobileNumber } from '../../store/actions/actoins-user'
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import { bindActionCreators } from 'redux';
import ThanksMessage from '../../components/ThanksMessage/ThanksMessage';
import Loading from '../../components/Loading/Loading';
import ROUTES from '../../configs/routes';

class VerifyPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mobileNumber: this.props.mobileNumber,
            isVerifyingMobile: false,
            isVerified: false,
            verifiyResponceMessage: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isVerifiedMobileResp && nextProps.isVerifyingMobile) {
            return {
                ...prevState,
                isVerifyingMobile: nextProps.isVerifyingMobile.verifyMobile || false,
                isVerified: nextProps.isVerifiedMobileResp.success || false,
                verifiyResponceMessage: nextProps.isVerifiedMobileResp.message || ''
            }
        }
        return null
    }

    routeNavigate = (location) => {
        this.props.ActionRouteNavigate(location);
    }

    render() {
        if (this.state.isVerified) {
            if (this.props.userType === "User")
                return <ThanksMessage
                    header={"Thanks for registering with us "}
                    message={"Check your mail, and follow the instructions to log in "}
                    routeNavigate={this.routeNavigate}
                />
            else
                return <ThanksMessage
                    header={"Thanks for registering with us "}
                    message={"Admin will verify your profile and will back to you."}
                    routeNavigate={this.routeNavigate}
                />
        }
        else
            return (
                <div className="verify verify-container">
                    <div className="logo">
                        <img src={require('../../assets/images/png/logo_white.png')} alt="logo" />
                    </div>
                    <h3>Verify Your Number </h3>
                    <p>Enter the OTP that we have shared with your registered mobile number </p>
                    <div className="otpInput">
                        <Formik
                            initialValues={{
                                otp: "",
                            }}
                            validationSchema={OTPFormValid}
                            onSubmit={(values, { setErrors, validateForm, setSubmitting }) => {
                                validateForm();
                                if (values.otp.length === 6 && typeof (Number(this.state.mobileNumber)) === 'number' && this.state.mobileNumber.length === 10) {
                                    if (this.props.verifyFromLogin) {
                                        const params =
                                        {
                                            "mobileNumber": this.state.mobileNumber,
                                            "otp": values.otp,
                                            "verifyFromLogin": true
                                        }
                                        this.props.ActionVerifyMobileNumber(params)
                                    }
                                    else {
                                        const params =
                                        {
                                            "mobileNumber": this.state.mobileNumber,
                                            "otp": values.otp
                                        }
                                        this.props.ActionVerifyMobileNumber(params)
                                    }
                                }

                            }}

                            render={({ values, handleChange, handleBlur, setFieldValue, errors }) => {

                                return (
                                    <Form className="otp">
                                        <InputText
                                            label=" "
                                            name="otp"
                                            type="password"
                                            disabled={this.state.isVerifyingMobile}
                                            value={values.otp}
                                            err={errors.otp}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter the OTP Here..."
                                            maxLength={6}
                                        />
                                        <button className="btn-verify" type="submit"><span>Verify</span></button>
                                    </Form>
                                )
                            }}
                        />
                        <div style={{ color: 'red' }}>{this.state.verifiyResponceMessage}</div>
                    </div>
                    <Loading isloading={this.props.isVerifyingMobile} />
                </div>
            )
    }
}

function mapStateToProps({ rUser, rLoading }) {
    return {
        isVerifyingMobile: rLoading.verifyMobile,
        isVerifiedMobileResp: rUser.mobileVerificationResponce || {}
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ActionVerifyMobileNumber,
        ActionRouteNavigate
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPage) 
