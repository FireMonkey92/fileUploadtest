import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import Talk from "talkjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { config } from '../../configs';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import Loading from '../../components/Loading/Loading';
import { openAntdNotification } from '../../services/notifications';
const { TALKJS_APPID } = config;
import './Chats.less';

class Chats extends Component {

    constructor(props) {
        super(props)
        this.inbox = undefined;
        let currentUser = ""
        if (props.user.role === "Member") {
            currentUser = props.talkJsLoggedInUser
        }
        if (props.user.role === "Provider" || props.user.role === "Organization") {
            currentUser = props.talkJsSelectedProvider
        }

        this.state = {
            currentUser,
            isLoadingChat: true
        }
    }

    componentWillUnmount() {
        if (window.talkSession) {
            window.talkSession = undefined
        }
    }

    loadChatInbox = (currentUser) => {
        if (currentUser)
            Talk.ready
                .then(() => {
                    const me = new Talk.User(currentUser);
                    if (!window.talkSession) {
                        window.talkSession = new Talk.Session({
                            appId: TALKJS_APPID,
                            me: me
                        });
                    }
                    this.inbox = window.talkSession.createInbox();
                    this.inbox.mount(this.container);
                    this.setState({ isLoadingChat: false })
                })
                .catch(e => {
                    console.error(e)
                    this.setState({ isLoadingChat: false })
                });
        else
            openAntdNotification({
                type: "error",
                title: "Failed",
                message: "You are not registred with talkjs, Please contact admin",
            });
        this.setState({ isLoadingChat: false })
    }

    componentDidMount() {
        const { currentUser } = this.state
        this.loadChatInbox(currentUser);
    }

    routeNavigation = (loaction) => {
        this.props.ActionRouteNavigate(loaction);
    }

    render() {
        return (
            <Fragment>
                <Header {...this.props} />
                <Row type="flex" justify="center" className="home_body">
                    <Col xs={23} sm={22} md={17} className="chat chat-page">
                        <div style={{ height: '500px' }} className="inbox-container" ref={c => this.container = c}><Loading isloading={true} /></div>
                    </Col>
                </Row>
                <Footer />
                {/* <Loading isloading={this.props.isloading} /> */}
            </Fragment>
        );
    }
}

function mapStateToProps({ rSession, rLoading, rServerData, rTalkJsUsers }) {
    return {
        user: rSession,
        talkJsLoggedInUser: rTalkJsUsers.talkjsMember || undefined,
        talkJsSelectedProvider: rTalkJsUsers.talkjsProvider || undefined,
        isloading: rLoading.logout
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ActionRouteNavigate,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats)