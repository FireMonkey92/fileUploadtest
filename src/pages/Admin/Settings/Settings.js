import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionGetServices, ActionGetQualification, ActionUpdateQualification, ActionUpdateService, ActionGetAllStates, ActionGetAllCities, ActionAddUpdateState, ActionAddUpdateCity, ActionGetCountry } from "../../../store/actions/actions-utils-data";
import Header from "../../../components/Header/Header";
import Qualifications from "./Qualifications/Qualifications";
import UpdateServices from "./UpdateServices/UpdateServices";
import States from './States/States';
import Cities from './Cities/Cities';

import './Settings.less'
import Loading from '../../../components/Loading/Loading';

const initialState = {
    isQualification: false,
    isUpdateService: false,
    isStates: false,
    isCity: false
}

class Settings extends Component {

    state = {
        isQualification: true,
        isUpdateService: false,
        isStates: false,
        isCity: false,

        qualificationData: [],
        servicesData: [],
        statesData: [],
        citiesData: [],
        countries: [],
        states: []
    }

    componentDidMount() {
        this.props.ActionGetQualification();
        this.props.ActionGetServices();
        this.props.ActionGetCountry();
        this.props.ActionGetAllStates();
        this.props.ActionGetAllCities();

    }

    static getDerivedStateFromProps(nextProps, prevState) {

        const { qualificationData, servicesData, statesData, citiesData, countries, states } = nextProps;
        if (qualificationData && servicesData && statesData && citiesData && countries && states) {
            return {
                ...prevState,
                qualificationData,
                servicesData,
                statesData,
                citiesData,
                countries,
                states
            }
        }
        return {
            prevState
        }
    }


    setTabs = (key) => {
        this.setState({
            ...initialState,
            [key]: true,
        })
    }


    addUpdateHandler = (params) => {
        const { role, token, id } = this.props.user
        const header = {
            role,
            'x-access-token': token
        }
        if (this.state.isQualification) {
            this.props.ActionUpdateQualification(params, header);
        }
        if (this.state.isUpdateService) {
            this.props.ActionUpdateService(params, header)
        }
        if (this.state.isStates) {
            this.props.ActionAddUpdateState(params, header)
        }
        if (this.state.isCity) {

            this.props.ActionAddUpdateCity(params, header);
        }
    }

    render() {
        const { isQualification, isUpdateService, isStates, isCity } = this.state;
        return (
            <div className="setting setting-page">
                <Header {...this.props} />
                <div className="setting-container">
                    <div className="setting-tabs_container">
                        <div>
                            <h3>General Settings</h3>
                            <div className={["tab ", isQualification ? ' active' : ""]}
                                onClick={() => this.setTabs('isQualification')}>Qualification</div>
                            <div className={["tab ", isUpdateService ? ' active' : ""]}
                                onClick={() => this.setTabs('isUpdateService')}>Services</div>
                            <div className={["tab ", isStates ? ' active' : ""]}
                                onClick={() => this.setTabs('isStates')}>States</div>
                            <div className={["tab ", isCity ? ' active' : ""]}
                                onClick={() => this.setTabs('isCity')}>Cities</div>
                        </div>

                    </div>
                    <div className="setting-table_container">
                        {
                            isQualification
                            &&
                            <Qualifications qualificationData={this.props.qualificationData} addUpdateHandler={this.addUpdateHandler} />
                        }
                        {
                            isUpdateService
                            &&
                            <UpdateServices servicesData={this.props.servicesData} addUpdateHandler={this.addUpdateHandler} />
                        }
                        {
                            isStates
                            &&
                            <States statesData={this.props.statesData} countries={this.props.countries.data} addUpdateHandler={this.addUpdateHandler} />
                        }
                        {
                            isCity
                            &&
                            <Cities citiesData={this.props.citiesData} countries={this.props.countries.data} addUpdateHandler={this.addUpdateHandler} />
                        }
                    </div>
                </div>
                <Loading isloading={this.props.isloading} />
            </div >
        )
    }
}
function mapStateToProps({ rLoading, rUtils, rSession }) {
    return {
        user: rSession,
        qualificationData: rUtils.qualification,
        servicesData: rUtils.services,
        statesData: rUtils.getAllStates,
        citiesData: rUtils.getAllCities,
        countries: rUtils.country,
        isloading: rLoading.updateService || rLoading.qualification || rLoading.services || rLoading.updateQualification || rLoading.addUpdateState || rLoading.addUpdateCity
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ActionGetServices,
        ActionUpdateService,
        ActionGetQualification,
        ActionUpdateQualification,
        ActionGetAllStates,
        ActionGetAllCities,
        ActionAddUpdateState,
        ActionAddUpdateCity,
        ActionGetCountry
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
