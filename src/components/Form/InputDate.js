import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import { ErrorMessage } from 'formik';
import moment from 'moment';

const AntdDatePicker = (props) => {

    const { name, format, showToday, style, disabled, value, onChange, placeholder, label, err, touched } = props;
    const [error, setError] = useState(0);
    return (
        <div className="input__wrap">
            {/* {!(err || touched) ? <label className="input__label" htmlFor={name}>{label}</label> : ""} */}
            {/* {!(err && touched) ? label !== undefined && <div className="input__label">{label}</div> : ""} */}
            {!(err && error) ? label !== undefined && <div className="input__label">{label}</div> : ""}
            <ErrorMessage name={name}>
                {errorMessage => {
                    errorMessage && setError(1);
                    return (<div className="input__error">{errorMessage}</div>)
                }}
            </ErrorMessage>
            <DatePicker
                disabledDate={d => !d || d.isAfter(moment().format('YYYY-MM-DD')) || d.isSameOrBefore("1900-01-01")}
                name={name}
                onChange={onChange}
                value={value === "" || !value ? null : moment(value)}
                placeholder={placeholder}
                format={format ? format : 'YYYY-MM-DD'}
                disabled={disabled ? true : false}
                showToday={showToday ? true : false}
                style={style}
            />
        </div>
    );
}

export default AntdDatePicker;