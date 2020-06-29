import React, { useState } from 'react'

import InputText from '../../../components/Form/InputText'
import { Formik, Form } from 'formik';

const SettingHeader = ({ title, inputValue, handleDrawer, inputPlaceHolder }) => {

    const [name, setName] = useState("")

    const handleChange = (e) => {
        setName(e.target.value)
        inputValue(e.target.value)
    }

    return (
        <div className="setting-header">
            <div className="title">{title}</div>
            <InputText
                name="name"
                type="text"
                placeholder={inputPlaceHolder}
                value={name}
                onChange={handleChange}
            />

            <div className="add_new_container">
                <button className="add_new" onClick={handleDrawer}>Add New</button>
            </div>
        </div>
    )
}


export default SettingHeader