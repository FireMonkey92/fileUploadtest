import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { Checkbox } from 'antd'
import _ from 'lodash'
import InputText from '../../../components/Form/InputText'
import SingleSelect from '../../../components/Form/SingleSelect'
import { UserSignupFormValidationSchema } from '../../../utils/utils-validation'
import AvatarUpload from '../../../components/Form/AvatarUpload'
import RadioInput from '../../../components/Form/RadioInput'
import AntdDatePicker from '../../../components/Form/InputDate';
import './User.less'
import ROUTES from '../../../configs/routes'
import {
    browserName,
} from "react-device-detect";


const User = (props) => {

    const { country, state, city, getState, getCity, isloadingState, isloadingCity, isloadingCountry } = props
    const countryOptions = country ? country.data : [{ label: '', values: '' }]
    const stateOptions = state ? state.data : [{ label: '', values: '' }]
    const cityOptions = city ? city.data : [{ label: '', values: '' }]

    const countryDisabled = country ? false : true
    const stateDisabled = state ? false : true
    const cityDisabled = city ? false : true

    const onSubmit = (values, actions) => {
        props.userSubmitAction(values)
    }
    const orig = location && location.origin

    let isWebViewFlag = false
    if (browserName === "Chrome WebView" || browserName === "WebKit")
        isWebViewFlag = true;

    return (
        <div id='userSignInForm'>
            <div className='signup-container'>
                <div className='head'>
                    <h2>Create your User account</h2>
                    {/* <p>Professionally streamline standardized alignments for vertical ideas. Phosfluorescently pursue sustainable
                                                                                    technologies without corporate processes. Credibly re-engineer flexible markets and multidisciplinary
                                                                                            platforms. </p> */}
                </div>
                <hr />
                <div className='form-container Independent'>
                    <div className='Independent-form'>
                        <Formik
                            initialValues={{
                                fname: '',
                                lname: '',
                                email: '',
                                country: '',
                                state: '',
                                city: '',
                                mobile: '',
                                gender: '',
                                agree: false,
                                avatar: '',
                                dateofbirth: null
                            }}
                            enableReinitialize
                            validationSchema={UserSignupFormValidationSchema}
                            onSubmit={onSubmit}
                            render={({ values, handleChange, setFieldValue, handleBlur, errors, touched, isLoading }) => {

                                return (
                                    <div className="formdivs">
                                        <Form >
                                            <h4>Let’s get started by uploading your profile Photo</h4>
                                            <div className="addAvatar">
                                                <AvatarUpload
                                                    name="avatar"
                                                    type="file"
                                                    onChange={(name, value) => {
                                                        setFieldValue(name, value)
                                                    }}
                                                />
                                            </div>
                                            <h4>Fill up your basic details here</h4>
                                            <div className="Independent-form">
                                                <div className="signup-form">
                                                    {/* First Name */}
                                                    <InputText
                                                        label="First Name"
                                                        name="fname"
                                                        type="text"
                                                        value={values.fname}
                                                        err={errors.fname}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* Last Name */}
                                                    <InputText
                                                        label="Last Name"
                                                        name="lname"
                                                        type="text"
                                                        value={values.lname}
                                                        err={errors.lname}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* Invalid email Id */}
                                                    <InputText
                                                        label="Email ID"
                                                        name="email"
                                                        type="email"
                                                        err={errors.email}
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* Mobile No */}
                                                    <InputText
                                                        label="Mobile Number"
                                                        name="mobile"
                                                        type="text"
                                                        value={values.mobile}
                                                        err={errors.mobile}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        maxLength={10}
                                                    />
                                                    {/* Country */}
                                                    <SingleSelect
                                                        className="country"
                                                        label="Country"
                                                        name="country"
                                                        readOnly={countryDisabled}
                                                        err={errors.country}
                                                        // value={values.country}
                                                        options={countryOptions}
                                                        onChange={(name, value) => {
                                                            setFieldValue(name, value)
                                                            setFieldValue('state', '')
                                                            setFieldValue('city', '')
                                                            getState(value)
                                                        }}
                                                        isLoading={isloadingCountry}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* state */}
                                                    <SingleSelect
                                                        className="state"
                                                        label="State"
                                                        name="state"
                                                        readOnly={stateDisabled}
                                                        err={errors.state}
                                                        value={_.filter(stateOptions, obj => obj.value === values.state)}
                                                        options={stateOptions}
                                                        onChange={(name, value) => {
                                                            setFieldValue(name, value)
                                                            setFieldValue('city', '')
                                                            getCity(value)
                                                        }}
                                                        isLoading={isloadingState}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* City */}
                                                    <SingleSelect
                                                        className="city"
                                                        label="City"
                                                        name="city"
                                                        readOnly={cityDisabled}
                                                        err={errors.city}
                                                        value={_.filter(cityOptions, obj => obj.value === values.city)}
                                                        options={cityOptions}
                                                        onChange={setFieldValue}
                                                        onBlur={handleBlur}
                                                        isLoading={isloadingCity}
                                                    />
                                                    <div className="input_select_date flex-row">
                                                        <AntdDatePicker
                                                            label="Date Of Birth"
                                                            className="dateofbirth"
                                                            format="YYYY-MM-DD"
                                                            err={errors.dateofbirth}
                                                            touched={values.dateofbirth}
                                                            value={values.dateofbirth}
                                                            name="dateofbirth"
                                                            placeholder="Select Date"
                                                            onChange={(date, dateofbirth) => {
                                                                setFieldValue('dateofbirth', dateofbirth)
                                                            }}
                                                        />
                                                    </div>
                                                    <RadioInput
                                                        label="Gender"
                                                        name="gender"
                                                        onChange={handleChange}
                                                        value={values.gender}
                                                        onBlur={handleBlur}
                                                        err={errors.gender}
                                                        options={[{ value: 'M', label: 'Male' }, { value: 'F', label: 'Female' }, { value: 'O', label: 'Other' }]}
                                                    />
                                                </div>
                                                <div className="submit">
                                                    <h6 className="iagree">
                                                        <ErrorMessage name="agree">
                                                            {errorMessage => <div className="error_message">{errorMessage}</div>}
                                                        </ErrorMessage>
                                                        <Checkbox
                                                            name="agree"
                                                            checked={values.agree}
                                                            onChange={(e) => {
                                                                setFieldValue('agree', e.target.checked)
                                                            }}
                                                            defaultChecked={true}
                                                        />

                                                        <span className="quote">
                                                            I agree to the{" "}
                                                            <a target={!isWebViewFlag ? '_blank' : '_self'} href={`${orig}${ROUTES.TERMS}`}>Terms Conditions</a> {' & '}
                                                            <a target={!isWebViewFlag ? '_blank' : '_self'} href={`${orig}${ROUTES.PRIVACY}`} >Privacy Policy</a>
                                                        </span>
                                                    </h6>
                                                    <button type="submit">Sign up</button>
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                )
                            }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
