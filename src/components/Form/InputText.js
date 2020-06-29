import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from "formik";
import { Input } from "antd";
import cl from "classnames";
import './InputStyle.less'

const InputText = (props) => {

    const [error, setError] = useState(0);
    const { placeholder, value, name, type, onChange, onBlur, label, err, disabled, maxLength, minLength } = props;

    return (
        <div className="input">
            {!(err && error) ? <label htmlFor={name}>{label}</label> : ""}
            <ErrorMessage name={name}>
                {errorMessage => {
                    errorMessage && setError(1);
                    return (
                        <div className="error_message">{errorMessage}</div>
                    )
                }}
            </ErrorMessage>
            <Input
                name={name}
                disabled={disabled}
                type={type || ""}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="off"
                className={cl((err && error) ? 'error_input' : "")}
                maxLength={maxLength}
                minLength={minLength}
            />
        </div>
    );
}

export default InputText;