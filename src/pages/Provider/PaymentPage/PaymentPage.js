import React, { Component } from "react";
import Header from "../../../components/Header/Header";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Modal from "react-modal";
import { ActionStoreBankDetails } from "../../../store/actions/actoins-user";
import { ActionGetBankDetails } from "../../../store/actions/actions-server-data";
import { ActionGetBanks } from "../../../store/actions/actions-utils-data";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import InputText from "../../../components/Form/InputText";
import Footer from "../../../components/Footer/Footer";
import { PaymentForm } from "../../../utils/utils-validation";
import "./PaymentPage.less";
import Loading from "../../../components/Loading/Loading";
import BankAccountCard from "./BankAccountCard/BankAccountCard";
import PaymentModal from "./PaymentModal/PaymentModal";
import SingleSelect from "../../../components/Form/SingleSelect";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "50%",
    height: "500px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    transition: "all 0.6s ease-in"
  }
};

class PaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      formData: {
        ifsc: "",
        accountNumber: "",
        accountName: "",
        bankName: ""
      }
    };
  }

  componentDidMount() {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token
    };
    this.props.ActionGetBankDetails(id, header);
    this.props.ActionGetBanks();
  }

  static getDerivedStateFromProps(props, state) {
    const { bankDetailsData } = props;
    if (bankDetailsData.length > 0)
      return {
        ...state,
        formData: {
          ifsc: bankDetailsData[0].ifsc,
          accountNumber: bankDetailsData[0].accountNumber,
          accountName: bankDetailsData[0].accountName,
          bankName: bankDetailsData[0].bankName
        }
      };
    else return state;
  }

  storeBankDetails = values => {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token
    };
    const Params = {
      ...values,
      userId: id
    };
    this.props.ActionStoreBankDetails(Params, header);
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { formData } = this.state;
    const BankDropdown = this.props.banks.map(obj => {
      return { label: obj.name, value: obj.value };
    });

    return (
      <div>
        <Header {...this.props} />
        <Row type="flex" justify="center" className="home_body">
          <Col xs={23} sm={23} md={22} lg={17}>
            <div className="Payments">
              <div className="headerSection">
                <div className="Payments-header">Payments</div>
                {/* <div className="Payments-description">
                  Professionally streamline standardized alignments for vertical
                  ideas. Phosfluorescently pursue sustainable technologies
                  without corporate processes. Credibly re-engineer flexible
                  markets and multidisciplinary platforms.
                </div> */}
              </div>
              <hr />
              <div className="Payments-FormContainer">
                {this.props.bankDetailsData.length > 0 ? (
                  <BankAccountCard
                    bankData={formData}
                    openModal={this.openModal}
                  />
                ) : (
                    <Formik
                      initialValues={{
                        ...formData
                      }}
                      validationSchema={PaymentForm}
                      onSubmit={(values, actions) => {
                        this.storeBankDetails(values);
                      }}
                      render={({
                        values,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        errors
                      }) => {
                        return (
                          <Form className="Payments-Detail">
                            <div className="ifscSection">
                              <h4>Bank Information</h4>
                              <div className="bankSection">
                                <SingleSelect
                                  className="bankName"
                                  label="Bank Name"
                                  name="bankName"
                                  err={errors.bankName}
                                  options={BankDropdown}
                                  onChange={setFieldValue}
                                  onBlur={handleBlur}
                                />
                                <InputText
                                  label="IFSC code"
                                  name="ifsc"
                                  type="text"
                                  value={values.ifsc}
                                  err={errors.ifsc}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  maxLength={11}
                                />
                              </div>
                            </div>
                            <h4>Add your bank account</h4>
                            <div className="bankSection">
                              <InputText
                                label="Account Number"
                                name="accountNumber"
                                type="text"
                                value={values.accountNumber}
                                err={errors.accountNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={18}
                              />
                              <InputText
                                label="Name on Account"
                                name="accountName"
                                type="text"
                                value={values.accountName}
                                err={errors.accountName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            <div className="submit">
                              <button type="submit">Add Account</button>
                            </div>
                          </Form>
                        );
                      }}
                    />
                  )}
              </div>
            </div>
          </Col>
        </Row>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          // style={customStyles}
          className="payment_modal_responsive"
          overlayClassName="ReactModal_Overly"
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <PaymentModal
            closeModal={this.closeModal}
            data={formData}
            paymentUpdateHandler={this.storeBankDetails}
            banks={this.props.banks}
          />
        </Modal>
        <Footer />
        <Loading isloading={this.props.isloading} />
      </div>
    );
  }
}

function mapStateToProps({ rSession, rLoading, rUser, rServerData, rUtils }) {
  return {
    user: rSession,
    isloading: rLoading.bankdetails,
    bankdetails: rUser.bankdetails || [],
    bankDetailsData: rServerData.bankdetails || [],
    banks: rUtils.banks || []
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionStoreBankDetails,
      ActionGetBankDetails,
      ActionGetBanks
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
