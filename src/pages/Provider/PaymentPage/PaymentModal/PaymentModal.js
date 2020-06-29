import React from 'react'
import { Form, Formik } from "formik";
import Select from 'react-select';
import { PaymentForm } from '../../../../utils/utils-validation'
import SingleSelect from '../../../../components/Form/SingleSelect'
import InputText from '../../../../components/Form/InputText'
import './PaymentModal.less';

const PaymentModal = ({ closeModal, data, paymentUpdateHandler, banks }) => {

    const updateBanks = []
    _.each(banks, (obj) => {
        updateBanks.push({ label: obj.name, value: obj.value })
    })

    return (
        <div className="payment-modal">
            <div className="payment-leftSide">
                <img src={require('../../../../assets/images/png/bank-building.png')} alt="bank-building" />
                {/* <h2>ICICI Bank</h2> */}
            </div>
            <div className="payment-rightSide">
                <div className="payment-modal-header">
                    <div className="title">Bank Account Details</div>
                    <div className="close" onClick={closeModal}>x</div>
                </div>
                <div className="payment-modal-body">
                    <Formik
                        initialValues={{
                            bankName: data.bankName,
                            accountName: data.accountName,
                            accountNumber: data.accountNumber,
                            ifsc: data.ifsc
                        }}
                        validationSchema={PaymentForm}
                        onSubmit={(values, actions) => {
                            let id = 1;
                            paymentUpdateHandler({ ...values, id })
                            closeModal();
                        }}
                        render={({ values, handleChange, errors, handleBlur, setFieldValue }) => {

                            return (
                                <Form>
                                    <div className="titleselect">
                                        <SingleSelect
                                            label="Bank Name :"
                                            options={updateBanks}
                                            value={_.filter(updateBanks, obj => obj.value === values.bankName)}
                                            classNamePrefix="payment-select"
                                            onChange={setFieldValue}
                                            name="bankName"
                                            err={errors.bankName}
                                        />
                                    </div>
                                    <div className="title">
                                        <InputText
                                            label="Account Name :"
                                            name="accountName"
                                            type="text"
                                            value={values.accountName}
                                            err={errors.accountName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="title">
                                        <InputText
                                            label=" Account Number :"
                                            name="accountNumber"
                                            value={values.accountNumber}
                                            err={errors.accountNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={18}
                                        />
                                    </div>
                                    <div className="title">
                                        <InputText
                                            label=" IFSC Code :"
                                            name="ifsc"
                                            value={values.ifsc}
                                            err={errors.ifsc}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={11}
                                        />
                                    </div>
                                    <div className="button-group">
                                        <button className="save" type="submit">Update Account </button>
                                    </div>
                                </Form>
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default PaymentModal;