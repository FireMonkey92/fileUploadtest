import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import { ActionGetJobDetails, ActionGetJobList } from "../../store/actions/actions-server-data";
import { ActionChangeJobStatus } from "../../store/actions/actoins-user";
import cl from "classnames";
import './CustomDrawerProvider.less';
import { UtilsHelper } from '../../utils/utils-helper';
import ROUTES from '../../configs/routes';

class CustomDrawerProvider extends Component {

    state = {
        jobDetails: {}
    }
    componentDidMount() {
        const { role, token, id } = this.props.user;
        const { providerId, jobId } = this.props.item;
        const Params = {
            "userId": providerId,
            "jobId": jobId,
        }

        const header = {
            role,
            'x-access-token': token
        }
        this.props.ActionGetJobDetails(Params, header);
    }

    static getDerivedStateFromProps(props, state) {
        const { jobDetails } = props;
        if (jobDetails.jobDetails !== undefined) {
            const jobDetail = {
                ...jobDetails.jobDetails,
                nextAction: jobDetails.nextAction
            }
            return {
                ...state,
                jobDetails: jobDetail
            }
        }
        else
            return state;
    }

    changeJobStatus = (jobId, statusId) => {
        this.props.onClose()
        const { role, token, id } = this.props.user;
        const Params = {
            "userId": id,
            jobId,
            statusId
        }
        const listParams = {
            "userId": id,
            "pgSkip": 0,
            "pgLimit": 10,
            "sortBy": "statusId",
            "sortByFlag": 1,
        }
        const header = {
            role,
            'x-access-token': token
        }
        this.props.ActionChangeJobStatus(Params, header);
        this.props.ActionGetJobList(listParams, header);
    }

    render() {
        const job = this.props.item;
        const description = this.state.jobDetails.description;
        const customData = UtilsHelper.getAssetsAndColor(job.statusId);
        
        return (
            <div className="customDrawer">
                <div className="customDrawer-head">
                    <div className="left">
                        <div className="back_button" onClick={() => this.props.onClose()}>
                            <img src={require('../../assets/images/png/left-arrow-black.png')} alt="Back Arrow" />
                            Back
                        </div>
                        <div>
                            <div className="title">
                                <h4 >{job.serviceName}</h4>
                                <span>Date: {job.createdDate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="chat" onClick={() => this.props.ActionRouteNavigate(ROUTES.CHATS)}>Chat</div>
                        <div className="namesection">
                            <span>Customer</span>
                            <h6>{job.memberName}</h6>
                        </div>
                    </div>
                </div>
                <div className="customDrawer-body">
                    <div className="customDrawer-body__card">
                        <div className="status">
                            <div className="title">
                                <h4 className={cl(customData.cls || "")}>{customData.providerMessage}</h4>
                                <span>Job ID : {job.jobId}</span>
                            </div>
                            <div className="button-group" >
                                {
                                    job.nextAction.map((item, i) => {
                                        if (item.label !== "")
                                            return (
                                                <button className={[customData.cls]} key={i} onClick={() => this.changeJobStatus(job.jobId, item.id)}>
                                                    {item.label}
                                                </button>
                                            )
                                        else
                                            return <span key={i}>{customData.AcknowledgeMessage}</span>
                                    })
                                }
                            </div>
                        </div>
                        <div className="payment">
                            <div>
                                <div className="amount">Payment : 
                                <div>₹ {job.PayedAmount}</div></div>
                                <div className="count">Count : {job.counts}</div>
                            </div>
                            <div className="payment_status"><span>Payment status: </span>{customData.drawermessage}</div>
                        </div>
                        <div className="notes">
                            <h6>Notes</h6>
                            <p>
                                {description && description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps({ rSession, rLoading, rServerData }) {
    return {
        user: rSession,
        isLoading: rLoading.jobDetails || rLoading.changeJobStatus,
        jobDetails: rServerData.jobDetails || {}
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ActionRouteNavigate,
        ActionGetJobDetails,
        ActionGetJobList,
        ActionChangeJobStatus
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerProvider)