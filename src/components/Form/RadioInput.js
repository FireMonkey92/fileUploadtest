import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from "formik";
import { Radio } from "antd";
import cl from "classnames";

import './InputStyle.less'

const RadioInput = (props) => {

    const [error, setError] = useState(0);
    const { value, name, onChange, onBlur, label, err, options } = props;

    return (
        <div className="input">
            {!(err && error) ? <label htmlFor={name}>{label}</label> : ""}
            <ErrorMessage name={name}>
                {errorMessage => {
                    errorMessage && setError(1)
                    return (
                        <div className="error_message">{errorMessage}</div>
                    )
                }}
            </ErrorMessage>
            <Radio.Group name={name} value={value} onChange={onChange} onBlur={onBlur} className={cl((err && error) ? 'error_input' : "")}>
                {options.map((item, index) => (
                    <Radio value={item.value} key={index}>{item.label}</Radio>
                ))}
            </Radio.Group>
        </div>
    );
}

export default RadioInput;