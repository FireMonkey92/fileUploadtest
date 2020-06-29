import React, { Component } from "react";
import { Row, Col } from "antd";
import { Form, Formik } from "formik";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import InputText from "../../../components/Form/InputText";
import { ActionGetServiceByProvider } from "../../../store/actions/actions-server-data";
import { ActionUpdateServicePrice, ActionUserUpdate } from "../../../store/actions/actoins-user";
import {
  ActionGetServices,
  ActionGetPriceConstants,
} from "../../../store/actions/actions-utils-data";

import "./ServicesPage.less";
import Loading from "../../../components/Loading/Loading";
import SingleSelect from "../../../components/Form/SingleSelect";
import Popup from "reactjs-popup";


class ServicesPage extends Component {
  _countCheck = 0;

  state = {
    showAddNewComponent: false,
    addNewArray: [],
    adminFees: undefined,
    gstFees: undefined,
  };

  componentDidMount() {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const params = {
      status: 1,
    };
    this.props.ActionGetServices(params);
    this.props.ActionGetServiceByProvider(id, header);
    this.props.ActionGetPriceConstants();
  }

  componentDidUpdate() {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };

    if (this.props.servicePriceSaveResponce.success) {
      this.setState({ showAddNewComponent: false, addNewArray: [] })
      this.props.ActionUserUpdate("servicePrice", undefined)
      this.props.ActionGetServiceByProvider(id, header);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { priceConstants } = nextProps;
    let GSTAMT;
    let ADMINFEES;
    if (priceConstants) {
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
      return {
        ...prevState,
        adminFees: ADMINFEES,
        gstFees: GSTAMT,
      };
    }

    return prevState;
  }

  changeServiceAmount = (values, actions) => {
    const { role, token, id } = this.props.user;
    const { serviceByProvider } = this.props;
    const { addNewArray, adminFees } = this.state;

    const header = {
      role,
      "x-access-token": token,
    };

    let updateServicesPrice = [];

    _.each(serviceByProvider, (i) => {
      updateServicesPrice.push({
        id: i.id,
        serviceId: i.serviceId,
        price: values[i.serviceId],
        totalPrice: values[i.serviceId],
      });
    });

    let newServiceArray = [];
    addNewArray.forEach((item) => {
      _.forEach(values, (Pvalue, Pkey) => {
        if (_.includes(Pkey, `newServiceId ${item}`)) {
          const price = values[`newServicePrice ${item}`];
          newServiceArray.push({
            id: 0,
            serviceId: Pvalue,
            price: price === undefined ? 0 : price,
          });
        }
      });
    });

    let servicePrices = [...updateServicesPrice, ...newServiceArray];

    servicePrices.forEach((i) => {
      i["totalPrice"] = i.price;
      i["price"] = (i.price * (1 - adminFees / 100)).toFixed(2);
    });

    servicePrices.forEach((i) => {
      i["adminFee"] = (i.totalPrice - i.price).toFixed(2);
    });

    // to avoide duplication
    const uniqueServPrices = _.uniqBy(servicePrices, function (e) {
      return e.serviceId;
    });
    const params = {
      providerId: id,
      servicePrices: uniqueServPrices,
    };
    console.log(params);
    this.props.ActionUpdateServicePrice(params, header);
  };

  addNewHandler = () => {
    let addNewArray = this.state.addNewArray;

    addNewArray.push(this._countCheck);
    this._countCheck += 1;
    this.setState({
      showAddNewComponent: true,
      addNewArray,
    });
  };

  removeHandler = (id) => {
    let addNewArray = this.state.addNewArray;
    addNewArray = _.filter(addNewArray, (n) => {
      return n !== id;
    });
    this.setState({ addNewArray });
  };

  renderServiceEditView = () => {
    const { serviceByProvider, services } = this.props;

    let addNewArray = [];
    this.state.addNewArray.forEach((i) => {
      addNewArray.push({ [i]: "", price: undefined });
    });

    let omitServices = [];
    omitServices = _.filter(services, (obj) => {
      return !_.find(serviceByProvider, (o) => {
        return o.serviceId === obj.value;
      });
    });

    if (this.state.adminFees) {
      const AdminFees = this.state.adminFees;
      return (
        <div className="Services">
          <div className="headerSection">
            <div className="Services-header">My Services</div>
            {/* <div className='Services-description'>
                            Professionally streamline standardized alignments for vertical ideas. Phosfluorescently pursue sustainable technologies without corporate processes. Credibly re-engineer
                            flexible markets and multidisciplinary platforms.
                    </div> */}
          </div>
          <hr />
          <div className="Services-FormContainer">
            <Formik
              onSubmit={(values, actions) =>
                this.changeServiceAmount(values, actions)
              }
              render={({
                values,
                handleChange,
                handleBlur,
                errors,
                setFieldValue
              }) => {
                return (
                  <Form className="Services-Detail">
                    <h4>Lets fix the rate for your services</h4>
                    <div className="Services-form">
                      <div className="Services-form-row">
                        <div className="services-name"></div>
                        <div className="services-input title">
                          Enter your rate
                        </div>
                        <div className="services-value title ">
                          Service Fees ?
                        </div>
                        <div className="services-value title">You’ll get…</div>
                      </div>
                      {serviceByProvider.length > 0
                        ? serviceByProvider.map((item, index) => {
                          const { serviceId, serviceName } = item;
                          let valType = typeof values[serviceId] == typeof "";

                          values[serviceId] = valType
                            ? values[serviceId]
                            : item.totalPrice;

                          return (
                            <div className="Services-form-row" key={index}>
                              <div className="services-name">
                                {serviceName}
                              </div>
                              <div className="services-input">
                                <span>₹ </span>
                                <InputText
                                  name={serviceId}
                                  type="text"
                                  value={values[serviceId]}
                                  err={errors[serviceId]}
                                  onChange={(e) => {
                                    if (/^\d*\.?\d*$/.test(e.target.value)) {
                                      handleChange(e);
                                    }
                                  }}
                                  onBlur={handleBlur}
                                />
                              </div>
                              <div className="services-value">
                                {" "}
                                {"₹ " +
                                  (
                                    values[serviceId] *
                                    (AdminFees / 100)
                                  ).toFixed(2)}{" "}
                              </div>
                              <div className="services-value">
                                {values[serviceId] === undefined
                                  ? null
                                  : `₹ ` +
                                  (
                                    values[serviceId] -
                                    values[serviceId] * (AdminFees / 100)
                                  ).toFixed(2)}
                              </div>
                            </div>
                          );
                        })
                        : null}
                    </div>
                    {this.state.addNewArray.length > 0 && this.state.showAddNewComponent
                      ? this.state.addNewArray.map((item) => {
                        return (
                          <div className="Services-form-row" key={item}>
                            <div className="services-name">
                              <Popup
                                trigger={
                                  <button className="button">
                                    {" "}
                                    <div
                                      className="remove"
                                      onClick={() => this.removeHandler(item)}
                                    >
                                      -
                                      </div>{" "}
                                  </button>
                                }
                                position="top center"
                                on="hover"
                              >
                                <div style={{ fontSize: 14, color: "red" }}>
                                  Remove
                                  </div>
                              </Popup>

                              <SingleSelect
                                className="service"
                                name={`newServiceId ${item}`}
                                options={omitServices}
                                onChange={setFieldValue}
                                onBlur={handleBlur}
                              />
                            </div>
                            <div className="services-input">
                              <span>₹ </span>
                              <InputText
                                name={`newServicePrice ${item}`}
                                type="text"
                                value={values[`newServicePrice ${item}`]}
                                onChange={(e) => {
                                  if (/^\d*\.?\d*$/.test(e.target.value)) {
                                    handleChange(e);
                                  }
                                }}
                                onBlur={handleBlur}
                              />
                            </div>
                            <div className="services-value">
                              {values[`newServicePrice ${item}`] !==
                                undefined &&
                                "₹ " +
                                (
                                  values[`newServicePrice ${item}`] * (AdminFees / 100)
                                ).toFixed(2)}
                            </div>
                            <div className="services-value">
                              {values[`newServicePrice ${item}`] === undefined
                                ? null
                                : `₹ ` +
                                (
                                  values[`newServicePrice ${item}`] -
                                  values[`newServicePrice ${item}`] * (AdminFees / 100)
                                ).toFixed(2)}
                            </div>
                          </div>
                        );
                      })
                      : null}
                    <div className="submit">
                      {serviceByProvider.length <= 9 && serviceByProvider.length + addNewArray.length <= 9 ?
                        <div className="add_new" onClick={this.addNewHandler}>
                          + Add New
                        </div> : <div></div>}
                      <button type="submit" className="save">
                        Save
                      </button>
                    </div>
                  </Form>
                );
              }}
            />
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Header {...this.props} />
        <Row type="flex" justify="center" className="home_body">
          <Col md={17} xs={23} sm={23}>
            {this.renderServiceEditView()}
          </Col>
        </Row>
        <Loading isloading={this.props.isloading} />
        <Footer />
      </div>
    );
  }
}
function mapStateToProps({ rSession, rLoading, rUtils, rServerData, rUser }) {
  return {
    user: rSession,
    isloading:
      rLoading.serviceByProvider ||
      rLoading.servicePrice ||
      rLoading.priceConstants ||
      rLoading.services,
    serviceByProvider: rServerData.serviceByProvider || [],
    services: rUtils.services || [],
    priceConstants: rUtils.priceConstants || undefined,
    servicePriceSaveResponce: rUser.servicePrice || false
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionGetServiceByProvider,
      ActionUpdateServicePrice,
      ActionGetServices,
      ActionGetPriceConstants,
      ActionUserUpdate
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesPage);
