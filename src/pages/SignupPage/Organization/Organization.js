import React from "react";
import { Checkbox } from "antd";
import { Formik, Form, ErrorMessage } from "formik";
import InputText from "../../../components/Form/InputText";
import InputTextArea from "../../../components/Form/InputTextArea";
import MultiSelect from "../../../components/Form/MultiSelect";
import SingleSelect from "../../../components/Form/SingleSelect";
import {
  OrganizationFormValidationSchema,
  OrganizationFormUpdateValidationSchema
} from "../../../utils/utils-validation";

import AvatarUpload from "../../../components/Form/AvatarUpload";
import { UtilsHelper } from "../../../utils/utils-helper";
import './Organization.less';
import ROUTES from "../../../configs/routes";
import {
  browserName,
} from "react-device-detect";


const Organization = props => {
  const {
    country,
    state,
    city,
    getState,
    getCity,
    services,
    userSubmitOrganisation,
    disableFields,
    removeProfileImage,
    disableFieldsForAdmin,
    previousData,
    isloadingState, isloadingCity, isloadingCountry
  } = props;

  const countryOptions = country ? country.data : [];
  const stateOptions = state ? state.data : [];
  const cityOptions = city ? city.data : [];
  const orig = location && location.origin

  let isWebViewFlag = false
  if (browserName === "Chrome WebView" || browserName === "WebKit")
    isWebViewFlag = true;


  return (
    <div className="form-container Independent">
      <div className="Independent-form">
        <Formik
          initialValues={{
            oname: previousData ? previousData.fullName : "",
            cname: previousData ? previousData.communicator : "",
            oemail: previousData ? previousData.email : "",
            country: previousData ? previousData.countryId : "",
            city: previousData ? previousData.cityId : "",
            state: previousData ? previousData.stateId : "",
            address: previousData ? previousData.address : "",
            gst: previousData ? previousData.GST : "",
            tan: previousData ? previousData.TAN : "",
            telephone: previousData ? previousData.telephoneNumber : "",
            phone: previousData ? previousData.communicatorPhoneNumber : "",
            startyear: previousData ? previousData.startedYear : "",
            totalmember: previousData ? previousData.totalMembers : "",
            services: previousData ? previousData.services : [],
            about: previousData ? previousData.description : "",
            agree: previousData ? true : false,
            avatar: previousData ? previousData.imageURL : ""
          }}
          enableReinitialize
          validationSchema={
            disableFields
              ? OrganizationFormUpdateValidationSchema
              : OrganizationFormValidationSchema
          }
          onSubmit={(values, actions) => {
            props.userSubmitOrganisation(values);
          }}
          render={({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            errors,
            isLoading
          }) => {
            const image = values.avatar || require('../../../assets/images/required/img_avatar.png');

            return (
              <Form className="signup">
                {disableFieldsForAdmin ? <><div className="avatar_row"><img src={image} alt="avatar" id="imagePreview" /><div className="title">{values.cname}</div></div><h4>Basic details of Organization</h4></> :
                  <>
                    <h4>
                      Let’s get started by uploading your profile Photo
                      (Communicator or Logo)
                    </h4>
                    <div className="addAvatar">
                      <AvatarUpload
                        name="avatar"
                        type="file"
                        removeProfileImage={removeProfileImage}
                        value={values.avatar}
                        onChange={(name, value) => {
                          setFieldValue(name, value);
                        }}
                      />
                    </div>
                    <h4>Fill up your basic details here</h4>
                  </>}

                <div className="Independent-form">
                  <div className="signup-form">
                    {/* Name of Organization*/}
                    <InputText
                      label="Name of Organization"
                      name="oname"
                      type="text"
                      disabled={disableFieldsForAdmin}
                      value={values.oname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      err={errors.oname}
                    />
                    {/* Communicator Name */}
                    <InputText
                      label="Communicator Name"
                      name="cname"
                      type="text"
                      disabled={disableFieldsForAdmin}
                      value={values.cname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      err={errors.cname}
                    />
                    {/* Email ID (Organization) */}
                    <InputText
                      label=" Email ID (Organization)"
                      name="oemail"
                      disabled={disableFields}
                      type="text"
                      value={values.oemail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      err={errors.oemail}
                    />
                    {/* Country */}
                    <SingleSelect
                      className="country"
                      label="Country"
                      readOnly={disableFields}
                      name="country"
                      err={errors.country}
                      value={_.filter(
                        countryOptions,
                        obj => obj.id === values.country
                      )}
                      options={countryOptions}
                      onChange={(name, value) => {
                        setFieldValue(name, value);
                        setFieldValue("state", "");
                        setFieldValue("city", "");
                        getState(value);
                      }}
                      onBlur={handleBlur}
                      isLoading={isloadingCountry}
                    />
                    {/* state */}
                    <SingleSelect
                      className="state"
                      label="State"
                      name="state"
                      readOnly={disableFieldsForAdmin}
                      err={errors.state}
                      value={_.filter(
                        stateOptions,
                        obj => obj.id === values.state
                      )}
                      options={stateOptions}
                      onChange={(name, value) => {
                        setFieldValue(name, value);
                        setFieldValue("city", "");
                        getCity(value);
                      }}
                      onBlur={handleBlur}
                      isLoading={isloadingState}
                    />
                    {/* City */}
                    <SingleSelect
                      className="city"
                      label="City"
                      name="city"
                      err={errors.city}
                      readOnly={disableFieldsForAdmin}
                      value={_.filter(
                        cityOptions,
                        obj => obj.id === values.city
                      )}
                      options={cityOptions}
                      onChange={setFieldValue}
                      onBlur={handleBlur}
                      isLoading={isloadingCity}
                    />
                    <div className="input-title">
                      <InputTextArea
                        row={4}
                        maxLength={200}
                        label="Address"
                        name="address"
                        disabled={disableFieldsForAdmin}
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        err={errors.address}
                      />
                    </div>
                    {/* Enter GST number */}
                    <InputText
                      label="Enter GST number"
                      name="gst"
                      type="text"
                      disabled={disableFields}
                      value={values.gst}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      err={errors.gst}
                      maxLength={15}
                    />
                    {/* Enter TAN number */}
                    <InputText
                      label="Enter TAN number"
                      name="tan"
                      type="text"
                      disabled={disableFields}
                      value={values.tan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      err={errors.tan}
                      maxLength={10}
                    />
                    {/* Telephone (Organization) */}
                    <InputText
                      label="Phone Number (Organization)"
                      name="telephone"
                      type="text"
                      disabled={disableFields}
                      value={values.telephone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      err={errors.telephone}
                      maxLength={10}
                    />
                    {/* Phone Number (Communicator) */}
                    <InputText
                      label="Phone Number (Communicator)"
                      name="phone"
                      type="text"
                      disabled={disableFields}
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      err={errors.phone}
                      maxLength={10}
                    />

                    {/* About Organization */}
                    <div className="input-title">
                      <h4>About Organization</h4>
                      <div className="half">
                        <SingleSelect
                          label="Organization Started year?"
                          name="startyear"
                          readOnly={disableFieldsForAdmin}
                          value={_.filter(
                            UtilsHelper.getCustomNumberInDropDown(2000, 2020),
                            obj => obj.value === values.startyear
                          )}
                          options={UtilsHelper.getCustomNumberInDropDown(
                            2000,
                            2020
                          )}
                          onChange={setFieldValue}
                          onBlur={handleBlur}
                          err={errors.startyear}
                        />
                        <SingleSelect
                          label="Total members in Organization?"
                          name="totalmember"
                          readOnly={disableFieldsForAdmin}
                          value={_.filter(
                            UtilsHelper.getCustomNumberInDropDown(1, 100),
                            obj => obj.value === values.totalmember
                          )}
                          options={UtilsHelper.getCustomNumberInDropDown(
                            1,
                            100
                          )}
                          onChange={setFieldValue}
                          onBlur={handleBlur}
                          err={errors.totalmember}
                        />
                      </div>
                    </div>
                    {/* Services organization offering*/}
                    <div className="input-title">
                      <h4>Services organization offering</h4>
                      <MultiSelect
                        label="Services you’re offering to clients ( you can add 10 services)"
                        name="services"
                        value={values.services}
                        options={services}
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                        isDisabled={disableFields}
                        err={errors.services}
                      />
                    </div>
                    {/*Explain about organization and services? */}
                    <div className="input-title">
                      <h4>Explain about organization and services?</h4>
                      <InputTextArea
                        row={10}
                        maxLength={200}
                        label="This will be your first impression on your profile to get more job order from clients"
                        placeholder="Write about the organization…."
                        name="about"
                        disabled={disableFieldsForAdmin}
                        value={values.about}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        err={errors.about}
                      />
                    </div>
                  </div>
                  {disableFieldsForAdmin ? null :
                    disableFields ? (
                      <div className="submit">
                        <button type="Save">Update Details</button>
                      </div>
                    ) : (
                        <div className="submit">
                          <h6 className="iagree">
                            <ErrorMessage name="agree">
                              {errorMessage => (
                                <div className="error_message">{errorMessage}</div>
                              )}
                            </ErrorMessage>
                            <Checkbox
                              name="agree"
                              checked={values.agree}
                              onChange={e => {
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

export default Organization;
