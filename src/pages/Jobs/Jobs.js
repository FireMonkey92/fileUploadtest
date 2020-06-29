import React, { Component } from 'react';
import { Row, Col, Drawer, Pagination } from "antd";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { ActionRouteNavigate } from '../../store/actions/actions-route';
import { ActionGetJobList } from "../../store/actions/actions-server-data";
import { ActionChangeJobStatus } from "../../store/actions/actoins-user";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Job from '../../components/Job/Job';
import LoadingJobList from '../../components/Loading/LoadingJobList';
import _ from "lodash";
import './Jobs.less';
import CustomDrawerProvider from '../../components/CustomDrawerProvider/CustomDrawerProvider';

class Jobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobList: [],
            showDrawer: false,
            drawerSelectItem: null
        }
    }

    componentDidMount() {
        const { role, token, id } = this.props.user;
        const Params = {
            "userId": id,
            "pgSkip": 0,
            "pgLimit": 10,
            "sortBy": "jobId",
            "sortByFlag": 1,
        }
        const header = {
            role,
            'x-access-token': token
        }
        this.props.ActionGetJobList(Params, header);
    }

    static getDerivedStateFromProps(props, state) {
        const { jobs, changeJobStatusRes } = props;
        if (changeJobStatusRes !== undefined) {
            if (changeJobStatusRes.data !== undefined)
                if (changeJobStatusRes.data.paymentLink) {
                    window.location.replace(changeJobStatusRes.data.paymentLink)
                }
        }
        if (jobs !== undefined) {
            let filterJobList = _.sortBy(jobs.job, (obj) => {
                return obj.jobId
            }).reverse();
            return {
                ...state,
                jobList: filterJobList
            }
        }
        else
            return state;
    }

    pageChange = (value) => {
        const { role, token, id } = this.props.user;

        const Params = {
            "userId": id,
            "pgSkip": (value - 1) * 10,
            "pgLimit": 10,
            "sortBy": "jobId",
            "sortByFlag": 1,
        }
        console.log(Params)
        const header = {
            role,
            'x-access-token': token
        }
        this.props.ActionGetJobList(Params, header);
    }

    handleJobClick = (item) => {
        this.setState({
            showDrawer: true,
            drawerSelectItem: item
        })
    }

    onClose = () => {
        this.setState({ showDrawer: false })
    }

    changeJobStatus = (jobId, statusId) => {
        const { role, token, id } = this.props.user;
        const Params = {
            "userId": id,
            jobId,
            statusId
        }
        const header = {
            role,
            'x-access-token': token
        }
        this.props.ActionChangeJobStatus(Params, header);
    }

    renderJobList = () => {
        const { isloading } = this.props;
        const { jobList } = this.state;
        
        if (!isloading && jobList.length > 0)
            return jobList.map((item, index) => {
                return <Job
                    key={index}
                    job={item}
                    changeJobStatus={this.changeJobStatus}
                    role={this.props.user.role}
                    handleJobClick={this.handleJobClick}
                />
            })
        else if (isloading)
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => <LoadingJobList key={index} />)
        else
            return <div className="flex-center no_data">No Data Found !</div>
    }

    render() {
        const totalCount = this.props.jobs.success === true ? this.props.jobs.totalCount : 0;
        return (
            <div>
                <Header {...this.props} />
                <Row type="flex" justify="center" className="chats chats-page">
                    <Col xs={23} sm={22} md={22} lg={17}>
                        <h2 className="chats-page-heading">
                            All Jobs
                        </h2>
                        {this.renderJobList()}
                        <div>
                            {
                                this.state.jobList.length > 0
                                &&
                                <Pagination defaultCurrent={1} total={totalCount} onChange={this.pageChange} />
                            }

                        </div>
                    </Col>
                </Row>
                <Footer />

                <Drawer
                    placement="right"
                    className="Jobsdrawer"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.showDrawer}
                >
                    <CustomDrawerProvider
                        item={this.state.drawerSelectItem}
                        onClose={this.onClose}
                    />
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps({ rSession, rLoading, rServerData, rUser }) {
    return {
        user: rSession,
        isloading: rLoading.jobList || rLoading.changeJobStatus,
        jobs: rServerData.jobList || {},
        changeJobStatusRes: rUser.changeJobStatus
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ActionChangeJobStatus,
        ActionRouteNavigate,
        ActionGetJobList
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs) 