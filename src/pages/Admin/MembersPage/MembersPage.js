import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionGetUsers } from "../../../store/actions/actions-server-data";
import {
  ActionValidateProvider,
  ActionGetUserDetails,
  ActionUserUpdate,
} from "../../../store/actions/actoins-user";
import {
  ActionGetServices,
  ActionGetQualification,
  ActionGetAllStates,
  ActionGetAllCities,
  ActionGetCountry,
} from "../../../store/actions/actions-utils-data";
import Header from "../../../components/Header/Header";
import { Row, Col, Table, Drawer, Pagination } from "antd";
import moment from "moment";
import { Formik, Form } from "formik";
import InputText from "../../../components/Form/InputText";
import "./MembersPage.less";
import Independent from "../../SignupPage/Independent/Independent";
import Organization from "../../SignupPage/Organization/Organization";
import SingleSelect from "../../../components/Form/SingleSelect";
import Loading from "../../../components/Loading/Loading";

class MembersPage extends Component {
  state = {
    Members: [],
    name: "",
    userType: "u",
    openDrawer: false,
    currentPage: 1,
    ProviderComponent: undefined,
    SelectedUserDetails: undefined,
    qualificationData: [],
    servicesData: [],
    statesData: [],
    citiesData: [],
    countries: [],
  };

  componentDidMount() {
    const { role, token } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      userType: "u",
      pgSkip: 0,
      pgLimit: 10,
      sortBy: "userId",
      sortByFlag: 1
      // userName: undefined,
    };
    this.props.ActionGetUsers(params, header);
    this.props.ActionGetQualification();
    this.props.ActionGetServices();
    this.props.ActionGetCountry();
    this.props.ActionGetAllStates();
    this.props.ActionGetAllCities();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      Members,
      userDetails,
      qualificationData,
      servicesData,
      statesData,
      citiesData,
      countries,
    } = nextProps;
    if (
      Members !== undefined &&
      qualificationData !== undefined &&
      servicesData !== undefined &&
      statesData !== undefined &&
      citiesData !== undefined &&
      countries !== undefined
    ) {
      if (userDetails !== undefined) {
        return {
          ...prevState,
          qualificationData,
          servicesData,
          statesData,
          SelectedUserDetails: userDetails,
          citiesData,
          countries: countries,
          Members: nextProps.Members.users,
        };
      }
      return {
        ...prevState,
        qualificationData,
        servicesData,
        statesData,
        citiesData,
        countries: countries,
        Members: nextProps.Members.users,
      };
    }
    return prevState;
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleChangeUserType = (name, value) => {
    this.setState({ userType: value, name: "", currentPage: 1 });
    const { role, token } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      userType: value,
      pgSkip: 0,
      pgLimit: 10,
      sortBy: "userId",
      sortByFlag: 1
      // userName: undefined,
    };

    this.props.ActionGetUsers(params, header);
  };

  handleSearch = () => {
    const { name } = this.state;
    const { role, token } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      userType: this.state.userType,
      pgSkip: 0,
      pgLimit: 10,
      userName: name,
      sortBy: "userId",
      sortByFlag: 1
    };

    this.props.ActionGetUsers(params, header);
  };

  onClose = () => {
    this.setState({ openDrawer: false });
    this.props.ActionUserUpdate("userDetails", undefined);
  };

  rowHandler = (record, rowIndex) => {
    return {
      onClick: (event) => {
        const { role, token, id } = this.props.user;
        const header = {
          role,
          "x-access-token": token,
        };
        if (record.userType !== "Member") {
          this.props.ActionGetUserDetails(record.userId, header);
        }
        this.setState({
          openDrawer: record.userType !== "Member" ? true : false,
          userID: record.userId,
          ProviderComponent: record.userType,
          record,
        });
      },
    };
  };

  handleValidateProvider = () => {
    const { role, token } = this.props.user;
    const { userType, userID, currentPage } = this.state;
    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      providerId: userID,
    };
    const extraParam = {
      userType: userType,
      pgSkip: (currentPage - 1) * 10,
      pgLimit: 10,
      sortBy: "userId",
      sortByFlag: 1
      // userName: name,
    };

    this.props.ActionValidateProvider(params, header, extraParam);
    this.setState({ openDrawer: false });
  };

  onPageChange = (pagination) => {
    this.setState({ currentPage: pagination });
    const { role, token } = this.props.user;
    const { userType, name } = this.state;
    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      userType: userType,
      pgSkip: (pagination - 1) * 10,
      pgLimit: 10,
      sortBy: "userId",
      sortByFlag: 1
      // userName: name,
    };
    this.props.ActionGetUsers(params, header);
  };

  renderDrawer = () => {
    const SelectedUserDetails = this.state.SelectedUserDetails;
    const { record } = this.state;
    let modifiedDateObj;
    let services = [];
    let newObjectPrevDetails = {};
    if (
      SelectedUserDetails !== undefined &&
      this.props.userDetails !== undefined
    ) {
      if (
        SelectedUserDetails.services !== "" ||
        SelectedUserDetails.services !== null
      ) {
        let temArry = JSON.parse(SelectedUserDetails.services);
        temArry.map((item) => {
          let obj = {
            id: item.serviceId,
            value: item.serviceId,
            label: item.serviceName,
            status: 1
          };
          services.push(obj);
        });
      }
      let dateString = "";
      if (SelectedUserDetails.dob !== undefined) {
        const dobString = SelectedUserDetails.dob;
        if (dobString !== null) {
          const datearry = _.split(dobString, "-");
          if (datearry.length > 0 && datearry.length === 3) {
            dateString = `${datearry[0]}-${datearry[1].toLowerCase()}-${
              datearry[2]
              }`;
            modifiedDateObj = moment(dateString, "DD-MMM-YYYY");
            // console.log(dateString);
          }
        } else {
          modifiedDateObj = null;
        }
      }
      newObjectPrevDetails = {
        ...SelectedUserDetails,
        dob: modifiedDateObj,
        services
      };

      const country = this.state.countries;
      let states = [];
      let city = [];
      this.state.statesData.map((item) => {
        let obj = {
          id: item.id,
          value: item.id,
          label: item.name,
        };
        states.push(obj);
      });
      const stateObj = {
        data: states,
      };
      this.state.citiesData.map((item) => {
        let obj = {
          id: item.id,
          value: item.id,
          label: item.name,
        };
        city.push(obj);
      });
      const cityObj = { data: city };
      const qualification = this.state.qualificationData;

      // console.log(services)

      return (
        <Drawer
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.openDrawer}
          className="member_page_model"
        >
          <div className="setting-form">
            <div>
              <div className="back_button" onClick={this.onClose}>
                Back
              </div>
              {this.state.ProviderComponent === "Individual" && services.length > 0 ? (
                <>
                  <Independent
                    previousData={newObjectPrevDetails}
                    disableFields={true}
                    disableFieldsForAdmin={true}
                    country={country}
                    state={stateObj}
                    qualifications={qualification}
                    city={cityObj}
                    services={services}
                  />
                </>
              ) : null}
              {this.state.ProviderComponent === "Organization" && services.length > 0 ? (
                <>
                  {" "}
                  <Organization
                    previousData={newObjectPrevDetails}
                    disableFieldsForAdmin={true}
                    disableFields={true}
                    country={country}
                    state={stateObj}
                    city={cityObj}
                    services={services}
                  />
                </>
              ) : null}
            </div>
            {record !== undefined
              ? record.userStatus !== 2 && (
                <button
                  onClick={this.handleValidateProvider}
                  className="button"
                >
                  Validate Provider
                </button>
              )
              : ""}
          </div>
        </Drawer>
      );
    }
  };

  render() {
    const { Members, name, userType, record } = this.state;
    let MembersDataWithkey = [];
    if (Members) {
      MembersDataWithkey = Members.map((item) => {
        return {
          ...item,
          key: item.userId,
        };
      });
    }
    const UserOptions = [
      {
        label: "Members",
        value: "u",
      },
      {
        label: "Providers",
        value: "p",
      },
    ];

    const usersColumns = [
      {
        title: "USER ID",
        dataIndex: "userId",
        key: "key",
        width: "7%",
      },
      {
        title: "USER NAME",
        dataIndex: "userName",
        key: "label",
        width: "15%",
      },
      {
        title: "COUNTRY",
        dataIndex: "country",
        key: "country",
        width: "10%",
      },
      {
        title: "STATE",
        dataIndex: "state",
        key: "state",
        width: "10%",
      },
      {
        title: "CITY",
        dataIndex: "city",
        key: "city",
        width: "10%",
      },
      {
        title: "EMAIL",
        dataIndex: "email",
        key: "email",
        width: "15%",
      },
      {
        title: "PHONE NUMBER",
        dataIndex: "mobileNumber",
        key: "mobileNumber",
        width: "10%",
      },
      {
        title: "DOB",
        dataIndex: "dob",
        key: "dob",
        width: "10%",
        render: (text) => <span>{text}</span>,
      }
    ];

    const providersColumn = [
      ...usersColumns,
      {
        title: "OWNED",
        dataIndex: "userType",
        key: "userType",
        width: "10%",
      },
      {
        title: " ",
        dataIndex: "userStatus",
        key: "userStatus",
        width: "5%",
        render: (text, record) => {
          return MembersDataWithkey.length > 0 && record.userStatus === 2 ? (
            <img
              src={require("../../../assets/images/png/check.png")}
              alt="Validate"
              style={{ width: 18, height: 18 }}
            />
          ) : (
              <img
                src={require("../../../assets/images/png/clockwise-rotation.png")}
                alt="Not Validate"
                style={{ width: 18, height: 18 }}
              />
            );
        },
      },
    ];
    const totalCount =
      this.props.Members !== undefined ? this.props.Members.totalCount : 0;
    return (
      <div>
        <Header {...this.props} />
        <Row type="flex" justify="center" className="member Help-Page">
          <Col xs={23} sm={22} md={22}>
            <div className="member-header">
              <SingleSelect
                name={"userType"}
                options={UserOptions}
                onChange={this.handleChangeUserType}
                defaultValue={[{ label: "Members", value: "u" }]}
              />
              <div className="member-input-group">
                <Formik
                  initialValues={{
                    name: "",
                  }}
                  onSubmit={this.handleSearch}
                  render={({ values, handleChange, handleSubmit }) => {
                    return (
                      <Form>
                        <InputText
                          name="name"
                          type="text"
                          placeholder={
                            userType === "p"
                              ? "Search by Provider Name..."
                              : "Search by Member Name..."
                          }
                          value={name}
                          onChange={this.handleChange}
                        />
                        <button className="button" type="submit">
                          Search
                        </button>
                      </Form>
                    );
                  }}
                />
              </div>
            </div>
            <div id="tableContainer">
              <Table
                dataSource={MembersDataWithkey}
                columns={userType === "u" ? usersColumns : providersColumn}
                onChange={this.onPageChange}
                onRow={this.rowHandler}
                rowClassName={(row, index) => {
                  return userType === "p" ? 'rowCursorPointer' : null
                }}
                pagination={false}
              />
              {MembersDataWithkey.length > 0 && (
                <Pagination
                  defaultCurrent={1}
                  total={totalCount}
                  onChange={this.onPageChange}
                  current={this.state.currentPage}
                />
              )}
            </div>
          </Col>
        </Row>
        {this.renderDrawer()}
        <Loading isloading={this.props.isloading} />
      </div>
    );
  }
}

function mapStateToProps({ rServerData, rSession, rLoading, rUtils, rUser }) {
  return {
    user: rSession,
    Members: rServerData.Members || undefined,
    userDetails: rUser.userDetails || undefined,
    qualificationData: rUtils.qualification || undefined,
    servicesData: rUtils.services || undefined,
    statesData: rUtils.getAllStates || undefined,
    citiesData: rUtils.getAllCities || undefined,
    countries: rUtils.country || undefined,
    isloading:
      rLoading.Members ||
      rLoading.qualification ||
      rLoading.services ||
      rLoading.getAllStates ||
      rLoading.getAllCities ||
      rLoading.country ||
      rLoading.userDetails ||
      rLoading.validateProvider,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionValidateProvider,
      ActionGetUsers,
      ActionGetServices,
      ActionGetQualification,
      ActionGetAllStates,
      ActionGetAllCities,
      ActionGetCountry,
      ActionGetUserDetails,
      ActionUserUpdate,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersPage);
