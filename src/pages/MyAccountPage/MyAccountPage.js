import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Formik, Form } from "formik";
import AvatarUpload from "../../components/Form/AvatarUpload";
import {
  ActionGetUserDetails,
  ActionUploadFile,
  ActionUserUpdate,
} from "../../store/actions/actoins-user";
import Loading from "../../components/Loading/Loading";

import "./MyAccountPage.less";
import { UserProfileUpdateForm } from "../../utils/utils-validation";

class MyAccountPage extends Component {
  state = {
    base64Content: "",
  };

  componentDidMount() {
    const { role, token, id } = this.props.session;
    const header = {
      role,
      "x-access-token": token,
    };
    this.props.ActionGetUserDetails(id, header);
  }

  onSubmit = (values, actions) => {
    const { role, token, id } = this.props.session;
    const header = {
      role,
      "x-access-token": token,
    };
    const Params = {
      userId: id,
      flag: "P",
      fileName: id,
      base64Content: values.avatar,
    };
    this.setState({
      base64Content: values.avatar,
    });
    if (values.avatar) {
      this.props.ActionUploadFile(Params, header);
      actions.resetForm({});
    }
  };
  removeProfileImage = () => {
    const { role, token, id } = this.props.session;
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
    const { userDetails } = this.props;
    let email,
      gender,
      imageURL,
      fullName,
      dob,
      mobileNumber = "";
    if (userDetails) {
      mobileNumber = userDetails.mobileNumber;
      fullName = userDetails.fullName;
      email = userDetails.email;
      gender = userDetails.gender;
      imageURL = userDetails.imageURL;
      dob = userDetails.dob;
    }

    return (
      <div>
        <Header {...this.props} />
        <Row type="flex" justify="center" className="account-page">
          <Col xs={23} sm={22} md={22} lg={17}>
            <div className="account-page-title">My Account</div>
            <div className="account-form flex-column">
              <div className="account-form detail">
                <div className="account-form-body">
                  <Formik
                    onSubmit={this.onSubmit}
                    validationSchema={UserProfileUpdateForm}
                    render={({ setFieldValue, values }) => {
                      const EnableBtn = values.avatar ? false : true;
                      return (
                        <Form className="left flex-column">
                          <div className="addAvatar">
                            <AvatarUpload
                              removeProfileImage={this.removeProfileImage}
                              name="avatar"
                              type="file"
                              onChange={(name, value) => {
                                setFieldValue(name, value);
                              }}
                              value={imageURL}
                            />
                          </div>
                          <div className="account-form-button">
                            <button
                              disabled={EnableBtn}
                              className={`flex-center ${
                                EnableBtn ? "disabled" : " save"
                                }`}
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  />
                  <div className="right">
                    <div className="Detail-form">
                      <div className="name">
                        <span>Name : </span>
                        {fullName}
                      </div>
                      <div className="name">
                        <span>Email : </span>
                        {email}
                      </div>
                      <div className="name">
                        <span>Mobile : </span>
                        {mobileNumber}
                      </div>
                      <div className="name">
                        <span>Date of Birth : </span>
                        {dob}
                      </div>
                      <div className="name">
                        <span>Gender : </span>
                        {gender}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Loading isloading={this.props.isloading} />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ rUser, rSession, rLoading }) {
  return {
    session: rSession,
    user: rUser,
    userDetails: rUser.userDetails || [],
    uploadFileRes: rUser.uploadFile,
    isloading: rLoading.userDetails || rLoading.uploadFile,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionGetUserDetails,
      ActionUploadFile,
      ActionUserUpdate,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountPage);
