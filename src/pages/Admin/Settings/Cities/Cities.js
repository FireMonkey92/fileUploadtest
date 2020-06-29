import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Drawer, Switch } from 'antd';
import { Formik, Form } from 'formik';
import _ from "lodash";
import SettingHeader from '../SettingHeader'
import InputText from '../../../../components/Form/InputText';
import SingleSelect from '../../../../components/Form/SingleSelect';
import Loading from '../../../../components/Loading/Loading';
import { ActionGetState } from "../../../../store/actions/actions-utils-data";
import { AdminSettingsCity } from '../../../../utils/utils-validation';
import InputTextArea from '../../../../components/Form/InputTextArea';


class Cities extends Component {

    state = {
        visible: false,
        citiesData: this.props.citiesData,
        isUpdate: false,
        name: '',
        description: '',
        prevCountry: '',
        prevState: '',
        getUpdateStatus: 1,
        getUpdateId: undefined,
        isRowSelected: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.citiesData) {
            if (prevState.isUpdate) {
                return {
                    ...prevState,
                    isUpdate: false
                }
            }
            else
                return {
                    ...prevState,
                    citiesData: nextProps.citiesData
                }
        }
        return prevState
    }

    componentDidMount() {
        const params = {
            status: 1,
            countryId: 1
        }
        this.props.ActionGetState(params);
    }

    handleDrawer = () => {
        this.setState({ visible: !this.state.visible, name: '', description: '', getUpdateStatus: 1, getUpdateId: undefined, prevCountry: '', prevState: '' })
    }

    onClose = () => {
        this.setState({ visible: false, isRowSelected: false });
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
            const FindFromArry = _.filter(this.state.citiesData, obj => obj.name.toLowerCase() === params.name.toLowerCase())
            if (FindFromArry.length > 0) {
                actions.setErrors({
                    name: "This City is already exists"
                })
            }
            else {
                this.props.addUpdateHandler(params);
                actions.resetForm();
                this.setState({ isUpdate: true, getUpdateStatus: 1, name: '', description: '', getUpdateId: undefined, prevCountry: '', prevState: '' })
                this.onClose();
            }
        }
        else {
            const FindFromArry = _.filter(this.state.citiesData, obj => obj.name.toLowerCase() === params.name.toLowerCase())
            if (FindFromArry.length > 0) {
                actions.setErrors({
                    name: "This City is already exists"
                })
            }
            else {
                this.props.addUpdateHandler(params);
                this.onClose();
            }
        }
    }

    handleFilter = (value) => {
        let citiesData = _.filter(this.props.citiesData, obj => {
            return _.includes(obj.name.toLowerCase(), value.toLowerCase())
        })
        if (value === "")
            citiesData = this.props.citiesData
        this.setState({
            citiesData,
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
                    prevCountry: record.countryId,
                    prevState: record.state_id,
                    isRowSelected: true
                })
                if (record.countryId) {

                }
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
                    visible={this.state.visible}>
                    <Formik
                        initialValues={{
                            name: this.state.name,
                            description: this.state.description,
                            countryId: this.state.prevCountry !== '' ? this.state.prevCountry : '',
                            stateId: this.state.prevState !== '' ? this.state.prevState : ''
                        }}
                        validationSchema={AdminSettingsCity}
                        enableReinitialize
                        onSubmit={this.onSubmit}
                        render={({ values, handleChange, handleBlur, setFieldValue, errors }) => {
                            return (
                                <Form className="setting-form">
                                    <div>
                                        <div className="back_button" onClick={this.onClose}>
                                            Back
                                        </div>
                                        <div className="title">{this.state.isRowSelected ? 'Edit ' : 'Add '} City</div>
                                        <InputText
                                            name="name"
                                            type="text"
                                            err={errors.name}
                                            label={"Enter City Name"}
                                            placeholder={"City "}
                                            value={values.name}
                                            onChange={handleChange}
                                        />
                                        <InputTextArea
                                            row={2}
                                            label="Description"
                                            placeholder="Enter City description"
                                            name="description"
                                            maxLength={100}
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            err={errors.description}
                                        />
                                        <SingleSelect
                                            className="country"
                                            label="Country"
                                            name="countryId"
                                            placeholder="Please Select Country"
                                            err={errors.countryId}
                                            value={this.props.countries.filter(obj => obj.id === values.countryId)}
                                            options={this.props.countries}
                                            onChange={(name, value) => {
                                                // const params = {
                                                //     status: 1,
                                                //     countryId: value
                                                // }
                                                // this.props.ActionGetState(params);
                                                setFieldValue(name, value);
                                            }}
                                            onBlur={handleBlur}
                                        />
                                        <SingleSelect
                                            className="state"
                                            label="State"
                                            name="stateId"
                                            placeholder="Please Select State"
                                            err={errors.stateId}
                                            value={this.props.state ? this.props.state.data.filter(obj => obj.id === values.stateId) : ''}
                                            options={this.props.state ? this.props.state.data : []}
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
        let { citiesData } = this.state;
        let citiesDataWithKey = [];
        if (citiesData) {
            const reversedData = _.reverse(_.clone(citiesData))
            citiesDataWithKey = reversedData.map((item, index) => {
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
                "stateId": object.state_id,
                "status": object.status === 1 ? 0 : 1
            }
            this.props.addUpdateHandler(params)
            this.setState({
                isUpdate: true
            })
        }

        const columns = [{
            title: 'S.No.',
            dataIndex: 'SrNo',
            key: 'SrNo',
            width: '10%',
        }, {
            title: 'CITY',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
        }, {
            title: 'STATE',
            dataIndex: 'stateName',
            key: 'stateName',
            width: '25%',
        },
        {
            title: 'COUNTRY',
            dataIndex: 'countryName',
            key: 'countryName',
            width: '25%',
        },
        {
            title: 'ACTION',
            dataIndex: 'ACTION',
            width: '11%',
            render: (text, record) => {
                return (
                    citiesDataWithKey.length > 0 &&
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
                    inputPlaceHolder="Search City by name ..."
                    title="Cities"
                    handleDrawer={this.handleDrawer}
                    inputValue={this.handleFilter}
                />
                <div id="tableContainer">
                    <Table
                        dataSource={citiesDataWithKey}
                        columns={columns}
                        onRow={(record, rowIndex) => this.rowClick(record, rowIndex)}
                        rowClassName={(row, index) => {
                            return 'rowCursorPointer'
                        }}
                    />
                </div>
                {this.renderDrawer()}
                <Loading isloading={this.props.isloading} />
            </div>
        )
    }
}


function mapStateToProps({ rLoading, rUtils, rSession }) {
    return {
        user: rSession,
        isloading: rLoading.state,
        state: rUtils.state || null
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ActionGetState
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)