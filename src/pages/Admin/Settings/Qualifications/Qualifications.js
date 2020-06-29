import React, { Component } from 'react'
import { Table, Drawer, Switch } from 'antd';
import { Formik, Form } from 'formik';
import SettingHeader from '../SettingHeader'
import _ from "lodash";
import { AdminSettingsQualification } from '../../../../utils/utils-validation';
import InputText from '../../../../components/Form/InputText';
import InputTextArea from '../../../../components/Form/InputTextArea';

class Qualifications extends Component {

    state = {
        visible: false,
        qualificationData: [],
        isUpdate: false,
        name: '',
        description: '',
        getUpdateStatus: 1,
        getUpdateId: undefined,
        isRowSelected: false

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.qualificationData) {
            if (prevState.isUpdate) {
                return {
                    ...prevState,
                    isUpdate: false
                }
            }
            return {
                ...prevState,
                qualificationData: nextProps.qualificationData
            }
        }
        return prevState
    }
    onSubmit = (values, actions) => {
        let params;
        if (this.state.getUpdateId) {
            params = params = {
                ...values,
                id: this.state.getUpdateId,
                status: this.state.getUpdateStatus
            }
        }
        else {
            params = {
                ...values,
                status: this.state.getUpdateStatus
            }
        }
        if (this.state.isRowSelected) {
            const FindFromArry = _.filter(this.state.qualificationData, obj => obj.label.toLowerCase() === params.name.toLowerCase())
            if (FindFromArry.length > 0) {
                actions.setErrors({
                    name: "This Qualification is already exists"
                })
            }
            else {
                this.props.addUpdateHandler(params);
                actions.resetForm({})
                this.setState({ isUpdate: true, getUpdateStatus: 1, name: '', description: '', getUpdateId: undefined })
                this.onClose();
            }
        } else {
            const FindFromArry = _.filter(this.state.qualificationData, obj => obj.label.toLowerCase() === params.name.toLowerCase())
            if (FindFromArry.length > 0) {
                actions.setErrors({
                    name: "This Qualification is already exists"
                })
            }
            else {
                this.props.addUpdateHandler(params);
                this.onClose();
            }
        }
    }

    handleDrawer = () => {
        this.setState({ visible: !this.state.visible, name: '', description: '', getUpdateStatus: 1, getUpdateId: undefined })
    }

    onClose = () => {
        this.setState({
            visible: false,
            isRowSelected: false
        })
    }



    handleFilter = (value) => {
        let qualificationData = _.filter(this.props.qualificationData, obj => {
            return _.includes(obj.label.toLowerCase(), value.toLowerCase());
        })
        if (value === "")
            qualificationData = this.props.qualificationData
        this.setState({
            qualificationData,
            isUpdate: true
        })
    }
    rowClick = (record, rowIndex) => {
        return {
            onClick: event => {
                this.setState({
                    name: record.label,
                    description: record.description,
                    visible: true,
                    getUpdateStatus: record.status,
                    getUpdateId: record.id,
                    isRowSelected: true
                })
                console.log(record, rowIndex)
            },
        };
    }


    randerDrawer = () => {
        if (this.state.visible)
            return (
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}>
                    <Formik
                        initialValues={{
                            name: this.state.name,
                            description: this.state.description
                        }}
                        validationSchema={AdminSettingsQualification}
                        enableReinitialize
                        onSubmit={this.onSubmit}
                        render={({ values, handleChange, errors, handleBlur }) => {
                            return (
                                <Form className="setting-form">
                                    <div>
                                        <div className="back_button" onClick={this.onClose}>
                                            Back
                                </div>
                                        <div className="title">{this.state.isRowSelected ? 'Edit ' : 'Add '}Qualification</div>
                                        <InputText
                                            name="name"
                                            type="text"
                                            err={errors.name}
                                            label={"Qualification"}
                                            placeholder={"Abbreviation of Qualification"}
                                            value={values.name}
                                            onChange={handleChange}
                                        />

                                        <InputTextArea
                                            row={2}
                                            label="Description"
                                            placeholder="Enter the full form of Qualification"
                                            name="description"
                                            maxLength={100}
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            err={errors.description}
                                        />
                                        <button type="submit" className="button">SAVE</button>
                                    </div>
                                </Form>
                            )
                        }}
                    />
                </Drawer>
            )
    }

    render() {
        let { qualificationData } = this.state;
        let qualicationDataWithkey = []
        if (qualificationData) {
            const reversedData = _.reverse(_.clone(qualificationData))
            qualicationDataWithkey = reversedData.map((item, index) => {
                return {
                    ...item,
                    'key': item.id,
                    'SrNo': index + 1
                }
            });
        }

        const onChange = (object) => {
            this.setState({
                visible: false
            })
            const params = {
                "id": object.id,
                "name": object.label,
                "status": object.status === 1 ? 0 : 1,
                "description": object.description
            }
            this.props.addUpdateHandler(params);
            this.setState({
                isUpdate: true
            })
        }

        const columns = [{
            title: 'S.No.',
            dataIndex: 'SrNo',
            key: 'SrNo',
            width: '8%',
        }, {
            title: 'LIST OF QUALIFICATIONS',
            dataIndex: 'label',
            key: 'label',
            width: '80%',
        }, {
            title: 'ACTIVE',
            dataIndex: 'ACTIVE',
            width: '15%',
            render: (text, record) => {
                return (
                    qualicationDataWithkey.length > 0 &&
                    <Switch onClick={(bool, e) => e.stopPropagation()}
                        checked={record.status === 1 ? true : false}
                        onChange={() => onChange(record)
                        } />
                );
            },
        }];
        return (
            <div>
                <SettingHeader
                    title="Qualifications"
                    inputPlaceHolder="Search Qualification by name ..."
                    handleDrawer={this.handleDrawer}
                    inputValue={this.handleFilter}
                />
                <div id="tableContainer">
                    <Table
                        dataSource={qualicationDataWithkey}
                        columns={columns}
                        onRow={(record, rowIndex) => this.rowClick(record, rowIndex)}
                        rowClassName={(row, index) => {
                            return 'rowCursorPointer'
                        }} />
                </div>
                {this.randerDrawer()}
            </div>
        )
    }
}

export default Qualifications