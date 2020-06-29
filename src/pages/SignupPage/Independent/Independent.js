import React from "react";
import { Checkbox } from "antd";
import { Formik, Form, ErrorMessage } from "formik";
import InputText from "../../../components/Form/InputText";
import InputTextArea from "../../../components/Form/InputTextArea";
import moment from "moment";
import MultiSelect from "../../../components/Form/MultiSelect";
import SingleSelect from "../../../components/Form/SingleSelect";
import AntdDatePicker from "../../../components/Form/InputDate";
import {
  IndependentFormValidationSchema,
  IndependentFormValidationSchemaUpdate,
} from "../../../utils/utils-validation";
import AvatarUpload from "../../../components/Form/AvatarUpload";
import { UtilsHelper } from "../../../utils/utils-helper";
import UploadSigleFile from "../../../components/Form/UploadSigleFile";
import {
  browserName,
} from "react-device-detect";
import ROUTES from "../../../configs/routes";
import "./Independent.less";

const Independent = (props) => {
  const {
    country,
    state,
    city,
    getState,
    getCity,
    services,
    qualifications,
    disableFields,
    previousData,
    disableFieldsForAdmin,
    removeProfileImage,
    isloadingState, isloadingCity, isloadingCountry
  } = props;

  const countryOptions = country ? country.data : [];
  const stateOptions = state ? state.data : [];
  const cityOptions = city ? city.data : [];

  const dobnew = new moment();
  const orig = location && location.origin

  let isWebViewFlag = false
  if (browserName === "Chrome WebView" || browserName === "WebKit")
    isWebViewFlag = true;


  return (
    <div className="form-container Independent">
      <div className="Independent-form">
        <Formik
          initialValues={{
            fname: previousData ? previousData.firstName : "",
            lname: previousData ? previousData.lastName : "",
            email: previousData ? previousData.email : "",
            country: previousData ? previousData.countryId : "",
            city: previousData ? previousData.cityId : "",
            state: previousData ? previousData.stateId : "",
            address: previousData ? previousData.address : "",
            pan: previousData ? previousData.panNumber : "",
            aadhaar: previousData ? previousData.aadhra : "",
            mobile: previousData ? previousData.mobileNumber : "",
            // date: previousData ? previousData.Bdate : "",
            // month: previousData ? previousData.monthNum : "",
            // year: previousData ? previousData.Byear : "",
            education: previousData ? previousData.qualificationId : "",
            certificate: previousData ? previousData.documentLink : "",
            workyears: previousData ? previousData.experience : "",
            workmonth: "",
            services: previousData ? previousData.services : [],
            about: previousData ? previousData.description : "",
            avatar: previousData ? previousData.imageURL : "",
            agree: previousData ? true : false,
            dateofbirth: previousData ? previousData.dob : null,
          }}
          validationSchema={
            disableFields
              ? IndependentFormValidationSchemaUpdate
              : IndependentFormValidationSchema
          }
          onSubmit={(values, actions) => {
            props.userSubmitIndepedent(values);
          }}
          enableReinitialize
          render={({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            errors,
            isLoading,
          }) => {
            const image =
              values.avatar ||
              require("../../../assets/images/required/img_avatar.png");
            return (
              <Form className="signup">
                {disableFieldsForAdmin ? (
                  <>
                    <div className="avatar_row">
                      <img src={image} alt="avatar" id="imagePreview" />
                      <div className="title">{values.fname}</div>
                    </div>
                    <h4>Basic details of Individual</h4>
                  </>
                ) : (
                    <>
                      <h4>Let’s get started by uploading your profile Photo</h4>
                      <div className="addAvatar">
                        <AvatarUpload
                          name="avatar"
                          value={values.avatar}
                          removeProfileImage={removeProfileImage}
                          type="file"
                          onChange={(name, value) => {
                            setFieldValue(name, value);
                          }}
                        />
                      </div>
                      <h4>Fill up your basic details here</h4>
                    </>
                  )}
                <div className="Independent-form">
                  <div className="signup-form">
                    {/* First Name */}
                    <InputText
                      label="First Name"
                      name="fname"
                      type="text"
                      disabled={disableFieldsForAdmin}
                      value={values.fname}
                      err={errors.fname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {/* Last Name */}
                    <InputText
                      // disabled={disableFields}
                      label="Last Name"
                      name="lname"
                      type="text"
                      disabled={disableFieldsForAdmin}
                      value={values.lname}
                      err={errors.lname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {/* Country Name */}
                    <SingleSelect
                      className="country"
                      label="Country"
                      name="country"
                      readOnly={disableFields}
                      err={errors.country}
                      value={_.filter(
                        countryOptions,
                        (obj) => obj.id === values.country
                      )}
                      options={countryOptions}
                      onChange={(name, value) => {
                        setFieldValue(name, value);
                        setFieldValue("state", "");
                        setFieldValue("city", "");
                        getState(value);
                      }}
                      onBlur={handleBlur}
                      // isLoading={values.country === "" && !isLoading}
                      isLoading={isloadingCountry}
                    />
                    {/* state */}
                    <SingleSelect
                      className="state"
                      label="State"
                      name="state"
                      readOnly={disableFieldsForAdmin}
                      // readOnly={disableFields}
                      err={errors.state}
                      value={_.filter(
                        stateOptions,
                        (obj) => obj.id === values.state
                      )}
                      options={stateOptions}
                      onChange={(name, value) => {
                        setFieldValue(name, value);
                        setFieldValue("city", "");
                        getCity(value);
                      }}
                      onBlur={handleBlur}
                      isLoading={isloadingState}
                    // isLoading={loading.state===true && !isLoading}
                    />
                    {/* City */}
                    <SingleSelect
                      className="city"
                      label="City"
                      name="city"
                      err={errors.city}
                      readOnly={disableFieldsForAdmin}
                      // readOnly={disableFields}
                      value={_.filter(
                        cityOptions,
                        (obj) => obj.id === values.city
                      )}
                      options={cityOptions}
                      onChange={setFieldValue}
                      onBlur={handleBlur}
                      isLoading={isloadingCity}
                    //  isLoading={loading.city===true && !isLoading}
                    />
                    <div className="input-title">
                      <InputTextArea
                        row={4}
                        maxLength={200}
                        label="Address"
                        name="address"
                        disabled={disableFieldsForAdmin}
                        err={errors.address}
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {/* Enter PAN number */}
                    <InputText
                      label="Enter PAN number"
                      name="pan"
                      type="text"
                      disabled={disableFields}
                      err={errors.pan}
                      value={values.pan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={10}
                    />
                    {/* Enter Aadhar number */}
                    <InputText
                      label="Enter Aadhar number"
                      name="aadhaar"
                      type="text"
                      disabled={disableFields}
                      err={errors.aadhaar}
                      value={values.aadhaar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={12}
                    />
                    {/* Email ID */}
                    <InputText
                      label="Email ID"
                      name="email"
                      type="email"
                      disabled={disableFields}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      err={errors.email}
                    />
                    {/* Mobile Number */}
                    <InputText
                      label="Mobile Number"
                      name="mobile"
                      type="text"
                      disabled={disableFields}
                      value={values.mobile}
                      err={errors.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={10}
                    />
                    <div className="input_select flex-row">
                      <div className="input_select_date flex-row">
                        <AntdDatePicker
                          label="Date Of Birth"
                          className="dateofbirth"
                          format="YYYY-MM-DD"
                          value={values.dateofbirth}
                          name="dateofbirth"
                          placeholder="Select Date"
                          disabled={disableFields}
                          onChange={(date, dateofbirth) => {
                            setFieldValue("dateofbirth", dateofbirth);
                          }}
                          err={errors.dateofbirth}
                        />
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div className="input-title">
                      <h4>Qualifications</h4>
                      <div className="half">
                        <SingleSelect
                          label="Add your Highest Education"
                          name="education"
                          value={_.filter(
                            qualifications,
                            (obj) => obj.value === values.education
                          )}
                          options={qualifications}
                          onChange={setFieldValue}
                          onBlur={handleBlur}
                          err={errors.education}
                          readOnly={disableFields}
                        />
                        {previousData ? null : (
                          <UploadSigleFile
                            label="Attachment of your Education Certificate (upload only .pdf .doc or .docx file)"
                            name="certificate"
                            disabled={disableFields}
                            value={values.certificate}
                            onChange={setFieldValue}
                            onClick={(e) => (e.target.value = null)}
                            onBlur={handleBlur}
                            err={errors.certificate}
                            className="certificate"
                          />
                        )}
                      </div>
                    </div>
                    {/* Work Experiences */}
                    <div className="input-title">
                      <h4>Work Experiences</h4>
                      <div className="smalldiv">
                        <SingleSelect
                          label="Years"
                          placeholder="Years"
                          name="workyears"
                          value={_.filter(
                            UtilsHelper.getCustomNumberInDropDown(1, 10),
                            (obj) => obj.label == values.workyears
                          )}
                          options={UtilsHelper.getCustomNumberInDropDown(1, 10)}
                          onChange={setFieldValue}
                          onBlur={handleBlur}
                          err={errors.workyears}
                          readOnly={disableFieldsForAdmin}
                        />
                        {/* <SingleSelect
                                                    label="Month"
                                                    placeholder="Month"
                                                    name="workmonth"
                                                    options={UtilsHelper.getCustomNumberInDropDown(1, 12)}
                                                    onChange={setFieldValue}
                                                    onBlur={handleBlur}
                                                    err={errors.workmonth}
                                                    readOnly={disableFields}
                                                /> */}
                      </div>
                    </div>
                    {/* Services you offering */}
                    <div className="input-title">
                      <h4>Services you offering</h4>
                      <MultiSelect
                        label="Services you’re offering to clients ( you can add 10 services)"
                        name="services"
                        isDisabled={disableFields}
                        value={values.services}
                        options={services}
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                        err={errors.services}
                      />
                    </div>
                    {/* Explain about yourself and services that you’re offering? */}
                    <div className="input-title">
                      <h4>
                        Explain about yourself and services that you’re
                        offering?
                      </h4>
                      <InputTextArea
                        disabled={disableFieldsForAdmin}
                        row={10}
                        maxLength={200}
                        label="This will be your first impression on your profile to get more job orders from clients"
                        placeholder="Write about your skills and experiences"
                        name="about"
                        value={values.about}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        err={errors.about}
                      />
                    </div>
                  </div>

                  {disableFieldsForAdmin ? null : disableFields ? (
                    <div className="submit">
                      <button type="Save">Save Details</button>
                    </div>
                  ) : (
                      <div className="submit">
                        <h6 className="iagree">
                          <ErrorMessage name="agree">
                            {(errorMessage) => (
                              <div className="error_message">{errorMessage}</div>
                            )}
                          </ErrorMessage>
                          <Checkbox
                            name="agree"
                            checked={values.agree}
                            onChange={(e) => {
                              setFieldValue("agree", e.target.checked);
                            }}
                            defaultChecked={true}
                          />
                          <span className="quote">
                            I agree to the{" "}
                            <a target={!isWebViewFlag ? '_blank' : '_self'} href={`${orig}${ROUTES.TERMS}`}>Terms Conditions</a> {' & '}
                            <a target={!isWebViewFlag ? '_blank' : '_self'} href={`${orig}${ROUTES.PRIVACY}`} >Privacy Policy</a>
                          </span>
                        </h6>
                        <button type="submit">Submit for Review</button>
                      </div>
                    )}
                </div>
              </Form>
            );
          }}
        />
      </div>
    </div>
  );
};

export default Independent;
