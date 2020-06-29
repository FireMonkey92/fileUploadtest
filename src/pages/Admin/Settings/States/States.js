import React, { Component } from 'react'
import { Table, Drawer, Switch } from 'antd';
import { Formik, Form } from 'formik';
import _ from "lodash";
import SettingHeader from '../SettingHeader'
import InputText from '../../../../components/Form/InputText';
import SingleSelect from '../../../../components/Form/SingleSelect';
import { AdminSettingsState } from '../../../../utils/utils-validation';
import InputTextArea from '../../../../components/Form/InputTextArea';

class States extends Component {
    state = {
        visible: false,
        statesData: this.props.statesData,
        isUpdate: false,
        name: '',
        description: '',
        prevCountry: '',
        getUpdateStatus: 1,
        getUpdateId: undefined,
        isRowSelected: false

    }
    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.statesData) {
            if (prevState.isUpdate) {
                return {
                    ...prevState,
                    isUpdate: false
                }
            }
            else
                return {
                    ...prevState,
                    statesData: nextProps.statesData
                }
        }
        return prevState
    }

    handleDrawer = () => {
        this.setState({ visible: !this.state.visible, name: '', description: '', getUpdateStatus: 1, getUpdateId: undefined, prevCountry: '' })
    }

    onClose = () => {
        this.setState({
            visible: false,
            isRowSelected: false
        })
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
            const FindFromArry = _.filter(this.state.statesData, obj => obj.name.toLowerCase() === params.name.toLowerCase())
            if (FindFromArry.length > 0) {
                actions.setErrors({
                    name: "This State is already exists"
                })
            }
            else {
                this.props.addUpdateHandler(params);
                actions.resetForm({});
                this.setState({ isUpdate: true, getUpdateStatus: 1, name: '', description: '', getUpdateId: undefined, prevCountry: '' })
                this.onClose();
            }

        } else {
            const FindFromArry = _.filter(this.state.statesData, obj => obj.name.toLowerCase() === params.name.toLowerCase())
            if (FindFromArry.length > 0) {
                actions.setErrors({
                    name: "This State is already exists"
                })
            }
            else {
                this.props.addUpdateHandler(params);
                this.onClose();
            }
        }
    }

    handleFilter = (value) => {

        let statesData = _.filter(this.props.statesData, obj => {
            return _.includes(obj.name.toLowerCase(), value.toLowerCase())
        })
        if (value === "")
            statesData = this.props.statesData
        this.setState({
            statesData,
            isUpdate: true
        })

    }
    rowClick = (record, rowIndex) => {
        return {
            onClick: event => {
                this.setState({
                    name: record.name,
                    description: record.description,
                    visible: true,
                    getUpdateStatus: record.status,
                    getUpdateId: record.id,
                    prevCountry: record.country_id,
                    isRowSelected: true
                })
            },
        };
    }

    renderDrawer = () => {
        if (this.state.visible)
            return (
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Formik
                        initialValues={{
                            name: this.state.name,
                            description: this.state.description,
                            countryId: this.state.prevCountry !== '' ? this.state.prevCountry : ''
                        }}
                        enableReinitialize
                        validationSchema={AdminSettingsState}
                        onSubmit={this.onSubmit}
                        render={({ values, handleChange, handleBlur, setFieldValue, errors }) => {
                            return (
                                < Form className="setting-form" >
                                    <div>
                                        <div className="back_button" onClick={this.onClose}>
                                            Back
                                    </div>
                                        <div className="title">{this.state.isRowSelected ? 'Edit ' : 'Add '} State</div>
                                        <InputText
                                            name="name"
                                            type="text"
                                            label={"Enter State Name"}
                                            placeholder={"State "}
                                            err={errors.name}
                                            value={values.name}
                                            onChange={handleChange}
                                        />

                                        <InputTextArea
                                            row={2}
                                            label="Enter State description"
                                            placeholder="description"
                                            name="description"
                                            maxLength={100}
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            err={errors.description}
                                        />

                                        <SingleSelect
                                            className="state"
                                            label="Country"
                                            name="countryId"
                                            err={errors.countryId}
                                            placeholder="Please Select Country"
                                            err={errors.countryId}
                                            value={this.props.countries.filter(obj => obj.id === values.countryId)}
                                            options={this.props.countries}
                                            onChange={setFieldValue}
                                            onBlur={handleBlur}
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
        let { statesData } = this.state;
        let statesDataWithKey = []
        if (statesData) {
            const reversedData = _.reverse(_.clone(statesData))
            statesDataWithKey = reversedData.map((item, index) => {
                return {
                    ...item,
                    'key': item.id,
                    'SrNo': index + 1
                }
            });
        }

        const onChange = (object) => {
            const params = {
                "id": object.id,
                "name": object.name,
                "description": object.description,
                "countryId": object.country_id,
                "status": object.status === 1 ? 0 : 1
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
            title: 'STATE',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
        },
        {
            title: 'COUNTRY',
            dataIndex: 'countryName',
            key: 'countryName',
            width: '40%',
        },
        {
            title: 'ACTIVE',
            dataIndex: 'ACTIVE',
            width: '12%',
            render: (text, record) => {
                return (
                    statesDataWithKey.length > 0 &&
                    <Switch
                        onClick={(bool, e) => e.stopPropagation()}
                        checked={record.status === 1 ? true : false}
                        onChange={() => onChange(record)} />
                );
            },
        }];
        return (
            <div>
                <SettingHeader
                    title="States"
                    inputPlaceHolder="Search State by name ..."
                    handleDrawer={this.handleDrawer}
                    inputValue={this.handleFilter}
                />
                <div id="tableContainer">
                    <Table
                        dataSource={statesDataWithKey}
                        columns={columns}
                        onRow={(record, rowIndex) => this.rowClick(record, rowIndex)}
                        rowClassName={(row, index) => {
                            return 'rowCursorPointer'
                        }}
                    />
                </div>
                {this.renderDrawer()}
            </div>
        )
    }
}

export default States