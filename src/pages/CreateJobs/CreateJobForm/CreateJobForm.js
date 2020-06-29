import React from 'react'
import { Formik, Form } from 'formik'
import SingleSelect from '../../../components/Form/SingleSelect'
import BlankProfilePIc from '../../../assets/images/required/img_avatar.png'
import InputTextArea from '../../../components/Form/InputTextArea'
import { UserCreateJobSelectService } from '../../../utils/utils-validation'
import _ from 'lodash'
import ROUTES from '../../../configs/routes'
import {
    browserName,
} from "react-device-detect";


const CreateJobForm = ({ services, provider, handleJobCreate, onChange }) => {

    const onSubmit = (values, actions) => {
        handleJobCreate(values)
    }

    const serviceData = services !== undefined ? services.data : []
    const orig = location && location.origin;

    let isWebViewFlag = false
    if (browserName === "Chrome WebView" || browserName === "WebKit")
        isWebViewFlag = true;


    return (
        <Formik
            initialValues={{
                serviceId: '',
                count: '',
                description: ''
            }}
            validationSchema={UserCreateJobSelectService}
            onSubmit={onSubmit}
            render={({ values, handleChange, handleBlur, setFieldValue, errors }) => {
                return (
                    <Form className="flex-column left selectService">
                        <div className="flex-center flex-column">
                            <div className="body">
                                <div className="head">
                                    <div className="title">
                                        <div className="avatar">
                                            {provider.imageURL
                                                ? <img src={provider.imageURL} alt="imageURL" />
                                                : <img src={BlankProfilePIc} alt="BlankProfilePIc" />}
                                        </div>
                                        <div>{provider.fullName}</div>
                                    </div>
                                    <span>Provider</span>
                                </div>
                                <SingleSelect
                                    label="Services"
                                    name="serviceId"
                                    options={serviceData}
                                    value={_.filter(serviceData, obj => obj.value === values.serviceId)}
                                    onChange={(name, value) => {
                                        setFieldValue(name, value)
                                        setFieldValue('count', 1)
                                        onChange(name, value)
                                    }}
                                    onBlur={handleBlur}
                                    err={errors.serviceId}
                                />
                                <SingleSelect
                                    label="Count"
                                    name="count"
                                    value={_.filter([{ value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' }], obj => obj.value === values.count)}
                                    options={[{ value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' }]}
                                    onChange={(name, value) => {
                                        setFieldValue(name, value)
                                        onChange(name, value)
                                    }}
                                    onBlur={handleBlur}
                                    err={errors.count}
                                />
                                <InputTextArea
                                    row={10}
                                    label="Notes"
                                    placeholder="Write any notes for your provider"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    err={errors.description}
                                />
                            </div>
                            <p className="privaryCheckout">Check out our{" "}
                                <a target={!isWebViewFlag ? '_blank' : '_self'} href={`${orig}${ROUTES.TERMS}`}>Terms Conditions</a> {' & '}
                                <a target={!isWebViewFlag ? '_blank' : '_self'} href={`${orig}${ROUTES.PRIVACY}`} >Privacy Policy</a></p>
                            <button type="submit">Create Job</button>
                        </div>
                    </Form>
                )
            }} />
    )
}

export default CreateJobForm
