import React, { useState } from 'react';
import Select from 'react-select';
import { ErrorMessage } from "formik";
import cl from "classnames";

const MultiSelect = (props) => {

    const [error, setError] = useState(0);
    const { options, name, label, onBlur, placeholder, err, isDisabled } = props;

    const handleChange = (value) => {
        props.onChange(name, value);
    };

    const customStyles = {
        control: base => ({
            ...base,
            minHeight: 65
        })
    };
    return (
        <div className="MultiSelect">
            {!(err && error) ? <label htmlFor={name}>{label}</label> : ""}
            <ErrorMessage name={name}>
                {errorMessage => {
                    errorMessage && setError(1)
                    return (
                        <div className="error_message">{errorMessage}</div>
                    )
                }}
            </ErrorMessage>
            <Select
                closeMenuOnSelect={false}
                isMulti
                value={props.value}
                name={name}
                styles={customStyles}
                isDisabled={isDisabled}
                options={options}
                isClearable={true}
                isSearchable={true}
                onChange={handleChange}
                onBlur={onBlur}
                classNamePrefix="_mutli-select"
                className={cl('_mutli-select', (err && error) ? 'error_input' : '')}
                placeholder={placeholder || ""}
            />
        </div>
    );
}
export default MultiSelect;