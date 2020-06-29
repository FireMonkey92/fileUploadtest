import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import _ from 'lodash';
import { bindActionCreators } from "redux";
import { Row, Col } from "antd";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import {
  ActionGetProviderDetails,
  ActionGetFeedbacks,
  ActionServerData,
} from "../../store/actions/actions-server-data";
import {
  ActionAddFav,
  ActionAddRating,
  ActionUserUpdate
} from "../../store/actions/actoins-user";

import { ActionGetTalkJsProvider } from '../../store/actions/actions-talkjs-users'
import { config } from "../../configs";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import JobOffering from "./JobOffering/JobOffering";
import FeedbackAndReview from "./Feedback&Review/FeedbackAndReview";
import ServiceProviderProfile from "./ServiceProviderProfile/ServiceProviderProfile";
import Loading from "../../components/Loading/Loading";
import { openAntdNotification } from "../../services/notifications";
const { TALKJS_APPID } = config;
import "./DetailsPage.less";

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerDetails: null,
      services: null,
      feedBackes: [],
      isChatOpen: false,
    };
  }
  componentDidUpdate() {
    if (this.props.addRatingReviewResponce) {
      console.log("calling refresh")
      this.props.ActionUserUpdate("feedbacks", undefined)
      this.props.ActionUserUpdate("addComment", undefined)
      this.refreshPage();
    }
  }
  componentDidMount() {
    const { providerId } = this.props.location.state;
    const { role, token, id } = this.props.user;
    const Params = {
      userId: id,
      memberId: id,
      providerId,
    };
    const header = {
      role,
      "x-access-token": token,
    };

    this.props.ActionGetProviderDetails(Params, header);
    this.props.ActionGetTalkJsProvider(providerId);
    this.props.ActionGetFeedbacks(Params, header);
  }


  static getDerivedStateFromProps(props, state) {
    const { providerDetails, feedBacks } = props;
    if (
      providerDetails !== undefined &&
      feedBacks !== undefined
    ) {
      const sortedFeedBackArray = _.reverse(_.sortBy(feedBacks.userFeedback, function (o) { return moment.utc(o.createdAt); }));
      return {
        ...state,
        providerDetails,
        services: providerDetails.services,
        feedBackes: sortedFeedBackArray,
      };
    } else return state;
  }

  addToFav = (providerId) => {
    const { role, token, id } = this.props.user;
    const header = {
      role,
      "x-access-token": token,
    };
    const Params = {
      memberId: id,
      providerId: providerId,
    };
    this.props.ActionAddFav(Params, header, { pageType: "DetailsPage" });
  };

  routeNavigate = (location, Params) => {
    this.props.ActionRouteNavigate(location, Params);
  };

  refreshPage = () => {
    const { providerId } = this.props.location.state;
    const { role, token, id } = this.props.user;
    const Params = {
      userId: id,
      memberId: id,
      providerId,
    };
    const header = {
      role,
      "x-access-token": token,
    };

    this.props.ActionGetProviderDetails(Params, header);
    this.props.ActionGetFeedbacks(Params, header);
  };

  handleChat = (Params) => {
    console.log(Params)
    const { talkJsLoggedInUser, talkJsSelectedProvider } = this.props;
    if (talkJsLoggedInUser === undefined && talkJsSelectedProvider === undefined) {
      openAntdNotification({
        type: "error",
        title: "Unable to get TalkjsUsers",
        message: "Please contact service provider"
      })
    }
    else {
      if (talkJsLoggedInUser === undefined) {
        openAntdNotification({
          type: "error",
          title: "You have not registered with talkjs",
          message: "Please contact the service provider"
        })
      }
      if (talkJsSelectedProvider === undefined) {
        openAntdNotification({
          type: "error",
          title: "Selected provider is registered with talkjs",
          message: "Please contact the service provider"
        })
      }
      if (talkJsLoggedInUser && talkJsSelectedProvider) {
        this.setState({ isChatOpen: true });
        Talk.ready
          .then(() => {
            /* Create the two users that will participate in the conversation */
            const me = new Talk.User(talkJsLoggedInUser);
            const other = new Talk.User(talkJsSelectedProvider);

            /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
            if (!window.talkSession) {
              window.talkSession = new Talk.Session({
                appId: TALKJS_APPID,
                me: me,
              });
            }

            /* Get a conversation ID or create one */
            const conversationId = Talk.oneOnOneId(me, other);
            const conversation = window.talkSession.getOrCreateConversation(
              conversationId
            );

            /* Set participants of the conversations */
            conversation.setParticipant(me);
            conversation.setParticipant(other);

            /* Create and mount chatbox in container */
            this.chatbox = window.talkSession.createChatbox(conversation);
            this.chatbox.mount(this.container);
          })
          .catch((e) => console.error(e));
      }
    }
  };

  handleAddFeedBackRating = (ACTION, VALUES) => {
    const { providerId } = this.props.location.state;
    const { role, token, id } = this.props.user;
    const Params = {
      memberId: id,
      providerId,
      ...VALUES
    };
    const header = {
      role,
      "x-access-token": token,
    };
    if (ACTION === "ADD_RATING") {
      this.props.ActionAddRating(Params, header);
    }
  };

  componentWillUnmount() {
    this.props.ActionServerData("feedbacks", undefined);
    if (window.talkSession) {
      window.talkSession = undefined
    }
  }

  render() {
    const { isloadingProviderDetails } = this.props;
    const {
      providerDetails,
      services,
      isChatOpen
    } = this.state;
    const providerDetailData =
      providerDetails !== null ? providerDetails : null;
    const servicesData = services !== null ? services : null;

    return (
      <div>
        <Header {...this.props} />
        <Row type="flex" justify="center" className="home_body">
          <Col xs={23} sm={22} md={17}>
            <ServiceProviderProfile
              providerDetails={providerDetailData}
              addFav={this.addToFav}
              goToPage={(location, Params) =>
                this.routeNavigate(location, Params)
              }
              isCallingAnyApi={!this.props.providerDetailsApi}
              openChat={(Params) => this.handleChat(Params)}
              refreshPage={this.refreshPage}
            />
            <JobOffering services={servicesData} />
            <FeedbackAndReview
              feedBacks={this.state.feedBackes}
              isCallingAnyApi={!this.props.ratingReviewApi}
              handleAddFeedBackRating={this.handleAddFeedBackRating}
            />
          </Col>
        </Row>
        <div
          className={`chatbox-container ${isChatOpen ? "show" : ""}`}
          ref={(c) => (this.container = c)}
        >
          <div id="talkjs-container" style={{ height: "800px" }}></div>
        </div>
        <Footer />
        <Loading isloading={isloadingProviderDetails} />
      </div>
    );
  }
}

function mapStateToProps({ rLoading, rServerData, rSession, rUtils, rUser, rTalkJsUsers }) {
  return {
    user: rSession,
    isloadingProviderDetails:
      rLoading.providerDetails ||
      rLoading.feedbacks ||
      rLoading.addComment ||
      rLoading.addRating ||
      rLoading.talkjsProvider,
    providerDetails: rServerData.providerDetails,
    feedBacks: rServerData.feedbacks,
    talkJsLoggedInUser: rTalkJsUsers.talkjsMember || undefined,
    talkJsSelectedProvider: rTalkJsUsers.talkjsProvider || undefined,
    addRatingReviewResponce: rUser.addComment && rUser.addRating ? true : false,
    providerDetailsApi: rLoading.providerDetails,
    ratingReviewApi: rLoading.feedbacks
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionRouteNavigate,
      ActionGetProviderDetails,
      ActionAddFav,
      ActionGetFeedbacks,
      ActionServerData,
      ActionAddRating,
      ActionUserUpdate,
      ActionGetTalkJsProvider
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
