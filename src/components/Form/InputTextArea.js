import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from "formik";
import { Input } from "antd";
import cl from "classnames";

import './InputStyle.less'
const InputTextArea = (props) => {

    const [error, setError] = useState(0);
    const { placeholder, value, name, onChange, onBlur, label, row, err, disabled, maxLength } = props;

    return (
        <div className="InputTextArea">
            {!(err && error) ? <label htmlFor={name}>{label}</label> : ""}
            <ErrorMessage name={name}>
                {errorMessage => {
                    errorMessage && setError(1)
                    return (
                        <div className="error_message">{errorMessage}</div>
                    )
                }}
            </ErrorMessage>
            <Input.TextArea
                rows={row}
                disabled={disabled}
                name={name}
                maxLength={maxLength}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                className={cl((err && error) ? 'error_input' : '')}
            />
        </div>
    );
}

export default InputTextArea;