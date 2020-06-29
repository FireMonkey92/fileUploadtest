import React, { Component } from "react";
import { Row, Col, Pagination } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import { ActionUpdateNotification } from "../../store/actions/actoins-user";
import moment from "moment";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import deleteImage from "../../assets/images/png/deleteNotification.png";
import Loading from "../../components/Loading/Loading";
import "./NotificationPage.less";

class NotificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  readNotificationHandler = (item) => {
    const { role, token, id } = this.props.user;

    const params = {
      notificationId: item.id,
      action: "UPDATE",
    };
    const header = {
      role,
      "x-access-token": token,
    };
    const extraParams = {
      userId: id,
    };

    this.props.ActionUpdateNotification(params, header, extraParams);
  };

  deleteNotificationHandler = (item) => {
    const { role, token, id } = this.props.user;

    const params = {
      notificationId: item.id,
      action: "DELETE",
    };
    const header = {
      role,
      "x-access-token": token,
    };
    const extraParams = {
      userId: id,
    };

    this.props.ActionUpdateNotification(params, header, extraParams);
  };
  pageChange = (currentPage) => {
    this.setState({ currentPage });
  };

  render() {
    var notification =
      this.props.notification === undefined
        ? []
        : this.props.notification.notifications;
    notification = _.orderBy(notification, ["createdDate"], ["desc"]);

    const paginatedArray = _.chunk(notification, 10);
    const { currentPage } = this.state;
    const { role } = this.props.user;
    return (
      <div>
        <Header {...this.props} />
        <div className="notification">
          <Row type="flex" justify="center">
            <Col xs={23} sm={22} md={17}>
              <div className="notification-header">
                <h2>Your notifications</h2>
              </div>
              <div className="notification-body">
                {notification.length > 0 && paginatedArray[currentPage - 1] ? (
                  paginatedArray[currentPage - 1].map((item, key) => {
                    return (
                      <div
                        key={key}
                        className={`flex space-between single_notification_container  ${
                          item.viewed === 1 ? "unread" : "read"
                          }`}
                      >
                        <div>
                          <div className="title">{item.tax}</div>
                          <div
                            className="status"
                            onClick={() => {
                              item.viewed === 1
                                ? this.readNotificationHandler(item)
                                : null;
                            }}
                          >
                            <span
                              className={item.viewed === 1 ? "unread" : "read"}
                            >
                              {item.message.description}
                            </span>
                          </div>
                          <div className="jobno">
                            Job no:  <span>{item.message.jobId}</span>
                            <span>
                              {" "}
                              {role === "Provider"
                                ? ` from Member: ${item.message.memberName}`
                                : role === "Member"
                                  ? `to Provider: ${item.message.providerName}`
                                  : null}
                            </span>
                          </div>
                        </div>
                        <div className="right">
                          {moment(item.createdDate).format("MMM D,  YYYY")}
                          <div
                            className="delete_notification"
                            onClick={() => this.deleteNotificationHandler(item)}
                          >
                            <img src={deleteImage} alt="de" />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                    <div className="no_notification"> No notification yet.</div>
                  )}
                <Pagination
                  pageSize={10}
                  defaultCurrent={1}
                  total={notification.length}
                  onChange={this.pageChange}
                />
              </div>
            </Col>
          </Row>
        </div>
        <Loading isloading={this.props.isloading} />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ rSession, rLoading, rServerData }) {
  return {
    user: rSession,
    isloading: rLoading.notification || rLoading.updateNotificaton,
    notification: rServerData.notification || undefined,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ActionUpdateNotification,
      ActionRouteNavigate,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
