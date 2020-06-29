import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Drawer } from 'antd';
import Popup from "reactjs-popup";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import { ActionGetNotification } from '../../store/actions/actions-server-data';
import { ActionLogout } from "../../store/actions/actoins-user";
import ROUTES from "../../configs/routes";
import Loading from '../Loading/Loading';
import moment from 'moment';
import _ from "lodash";
import './Header.less'

class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userDetails: [],
			notificationCount: 0,
			visible: false,
			open: false
		}
	}



	static getDerivedStateFromProps(props, state) {
		const { userDetails, notification } = props;

		let notificationCount = 0;
		if (notification !== undefined) {
			notificationCount = _.filter(notification.notifications, (obj) => {
				return obj.viewed === 1
			}).length;
			return {
				...state,
				userDetails,
				notificationCount
			}
		}

		else
			return state;
	}

	routeNavigation = (loaction, headerName) => {
		if (headerName !== undefined) {
			this.props.ActionRouteNavigate(loaction, { headerName: headerName });
		}
		else
			this.props.ActionRouteNavigate(loaction);
		// window.location.reload(loaction)

		this.setState({
			visible: false
		})
	}

	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	componentDidMount() {
		const { role, token, id } = this.props.user
		const header = {
			role,
			'x-access-token': token
		}
		const Params = {
			userId: id,
			// viewStatus: 1
		}
		if (role !== "Admin")
			this.props.ActionGetNotification(Params, header);
	}

	handleLogout = () => {
		const { role, refreshToken, token, mobileNumber } = this.props.user;
		const Params = {
			mobileNumber,
			refreshToken
		}
		const header = {
			role,
			'x-access-token': token
		}
		localStorage.clear();
		this.props.ActionLogout(Params, header);
	}

	render() {
		const { role, name, authenticated } = this.props.user;
		const { notificationCount } = this.state;
		const LocalProfilePic = localStorage.getItem('USER_PROFILE_PIC');
		const activeRoute = this.props.location.pathname;
		var notification = this.props.notification === undefined ? [] : this.props.notification.notifications;
		notification = _.orderBy(notification, ['createdDate'], ['desc']);
		const sortednotificationArray = _.take(notification, 3);
		const { pathname, state } = this.props.location;

		let defaultImageURL = require('../../assets/images/required/img_avatar.png');

		if (authenticated)
			return (
				<div className="header">
					<Row type="flex" justify="center" className="header-body">
						< Col xs={23} sm={22} md={22} lg={role === "Admin" ? 22 : 17}>
							<div className="header-container">
								<div className="align-center">
									{/* Header Logo For Mobile */}
									{pathname !== "/home" ?
										<div className="mobileheadernotification">
											<div className="mobileheaderimage" onClick={() => this.routeNavigation(ROUTES.HOME)}>
												<img src={require('../../assets/images/png/left-arrow.png')} alt="back" />
											</div>
											<div className="mobileheaderheader">
												<h3>{state ? state.headerName : null}</h3>
											</div>
										</div> : <div className="logos" onClick={() => this.routeNavigation(ROUTES.HOME)}>
											<img src={require('../../assets/images/png/logo_white.png')} alt="logo" />
										</div>
									}
									<div className="logo" onClick={() => this.routeNavigation(ROUTES.HOME)}>
										<img src={require('../../assets/images/png/logo_white.png')} alt="logo" />
									</div>
									<div className="nav-links align-center">
										{
											role === "Member"
												? <>
													<div className={(activeRoute == ROUTES.HOME) ? "active" : ""}
														onClick={() => this.routeNavigation(ROUTES.HOME)}>Home </div>
													<div className={(activeRoute == ROUTES.FAVORITES) ? "active" : ""}
														onClick={() => this.routeNavigation(ROUTES.FAVORITES, "Favorites")}>Favorites</div>
												</>
												:
												<div className={(activeRoute == ROUTES.HOME) ? "active" : ""}
													onClick={() => this.routeNavigation(ROUTES.HOME)}>Dashboard</div>
										}
										{
											role === "Admin"
												? <>
													<div className={(activeRoute == ROUTES.ADMIN_MEMBERS) ? "active" : ""}
														onClick={() => this.routeNavigation(ROUTES.ADMIN_MEMBERS, "Members")}>Members</div>
													<div className={(activeRoute == ROUTES.JOBS) ? "active" : ""}
														onClick={() => this.routeNavigation(ROUTES.JOBS, "All Jobs")}>Job Orders</div>
													<div className={(activeRoute == ROUTES.ADMIN_SETTINGS) ? "active" : ""}
														onClick={() => this.routeNavigation(ROUTES.ADMIN_SETTINGS, "Settings")}>Settings</div>
												</>
												:
												<>
													<div className={(activeRoute == ROUTES.CHATS) ? "active" : ""}
														onClick={() => this.routeNavigation(ROUTES.CHATS, "Chats")}>Chats</div>
													<div className={(activeRoute == ROUTES.JOBS) ? "active" : ""}
														onClick={() => this.routeNavigation(ROUTES.JOBS, "All Jobs")}>Jobs</div>
													{
														role === "Provider" || role === "Organization"
															?
															<div className={(activeRoute == ROUTES.SERVICES) ? "active" : ""}
																onClick={() => this.routeNavigation(ROUTES.SERVICES, "My Services")}>My Services</div> : null
													}
													<div className={(activeRoute == ROUTES.HELP) ? "active" : ""}
														onClick={() => this.routeNavigation(ROUTES.HELP, "Help")}>Help</div>
												</>
										}
									</div>
								</div>
								<div className="account flex-row">
									{
										role === "Admin" &&
										<div className="logout" onClick={() => this.handleLogout()}>
											<img src={require('../../assets/images/png/power.png')} alt="Power" style={{ width: 20, height: 20 }} />
										</div>
									}
									{
										role !== "Admin" &&
										<Popup
											lockScroll
											trigger={open => (
												<div className="icon" >
													<img src={require('../../assets/images/png/bell-1@3x.png')} alt="bell" className="bell" />
													{
														notificationCount > 0
														&&
														<div className="notification_count">{notificationCount > 9 ? `9+` : notificationCount}</div>
													}
												</div>
											)}
											position="bottom center"
											className="_bell"
											closeOnDocumentClick
										>
											<div className="popup-notification">
												{sortednotificationArray.map((item, index) => (
													<div className="flex-dolumn single-list" key={index}>
														<div className="date">{moment(item.createdDate).format('MMM D,  YYYY')}</div>
														<div className={(item.viewed === 1) ? "status unread" : "status read"}
															onClick={() => this.routeNavigation(ROUTES.NOTIFICATION, "Notification")} >
															{item.message.description}
														</div>
														<div className="desc">Job Id : {item.message.jobId}</div>
													</div>
												))}
												<div onClick={() => this.routeNavigation(ROUTES.NOTIFICATION, "Notification")} className="view_All_Notification">View all notifications</div>
											</div>
										</Popup>
									}
									<div className="avatar">
										<img src={LocalProfilePic === null ? defaultImageURL : LocalProfilePic} alt="Profile Pic" />
									</div>
									{
										role === 'Admin'
											? <div className="flex-column" >
												<div className="account-name none">
													<div className="profile_name">{name}</div>
													<span >Administrator</span>
												</div>
											</div>
											: <div className="flex-column" >
												<Popup
													trigger={open => (
														<div className="account-name">
															<div className="profile_name">{name}</div>
															<span >My Account</span>
														</div>
													)}
													className="_account"
													position="bottom center"
													closeOnDocumentClick
													lockScroll
												>
													<div className="popup-account flex-column">
														<div onClick={() => this.routeNavigation(ROUTES.MYACCOUNT, "My Account")}>My Account</div>
														{(role === 'Provider' || role === 'Organization') && <div onClick={() => this.routeNavigation(ROUTES.PAYMENT, "Payment")}>Payment</div>}
														{(role === 'Provider' || role === 'Organization') && <div onClick={() => this.routeNavigation(ROUTES.SERVICES, "Services")}>Services</div>}
														<div className="space-between align-center" onClick={() => this.handleLogout()}>Logout <span> <img src={require('../../assets/images/png/power@3x.png')} alt="Power" /></span></div>
													</div>
												</Popup>
											</div>
									}
									{/* Merging code start */}
								</div>
								<div className="mobiledrawerimage">
									{role !== "Admin" ?
										<div className="bellmobile">
											{/* bell icon */}
											<Popup
												trigger={open => (
													<div id="notificationicon" className="icon" >
														<img src={require('../../assets/images/png/bell-1@3x.png')} alt="bell" className="bell" />
														{
															notificationCount > 0
															&&
															<div className="notification_count">{notificationCount > 9 ? `9+` : notificationCount}</div>
														}
													</div>
												)}
												position="bottom center"
												className="_bell"
												closeOnDocumentClick
												lockScroll
											>
												<div className="popup-notification">
													{sortednotificationArray.map((item, index) => (
														<div className="flex-dolumn single-list" key={index}>
															<div className="date">{moment(item.createdDate).format('MMM D,  YYYY')}</div>
															<div className={(item.viewed === 1) ? "status unread" : "status read"}
																onClick={() => this.routeNavigation(ROUTES.NOTIFICATION, "Notification")} >
																{item.message.description}
															</div>
															<div className="desc">Job Id : {item.message.jobId}</div>
														</div>
													))}
													<div onClick={() => this.routeNavigation(ROUTES.NOTIFICATION, "Notification")} className="view_All_Notification">View all notifications</div>
												</div>
											</Popup>
										</div> : null}

									{/* for provider Individual and Orgenization */}
									{
										role === 'Provider' || role === "Organization" ? <div className="menumobile">
											{/* Menu icon */}
											<Popup
												lockScroll
												trigger={open => (
													<div className="icon" >
														<img src={require('../../assets/images/png/menu-button.png')} alt="bell" className="bell" />
													</div>
												)}
												modal
												position="bottom center"
												className="_bell"
												closeOnDocumentClick

											>
												<div className="popup-notification">
													<div className="menubaricon-model">
														<div className="avatar-model-header">
															<div className="avatardiv">
																<img className="avatarimagemobile" src={LocalProfilePic === null ? defaultImageURL : LocalProfilePic} alt="Profile Pic" />
															</div>

															<div className="account-name">
																<div className="profile_name">{name}</div>
															</div>
														</div>

														<div className="menuroutes-model-body">
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.HOME)}>
																Dashboard
													   		</div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.CHATS, "Chats")}>
																Chats
													  		</div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.JOBS, "All Jobs")}>
																Jobs
													   		</div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.SERVICES, "Services")} >
																Services
														    </div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.HELP, "Help")}>
																Help
													   	    </div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.MYACCOUNT, "My Account")}>
																My Account
												   			</div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.PAYMENT, "Payment")}>
																Payment
													  		</div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.handleLogout()}>
																Logout
													   		</div>
															<hr />
														</div>
													</div>
												</div>
											</Popup>
										</div> : null}
									{/* for Member  */}
									{role === "Member" ?
										<div className="menumobile">
											{/* Menu icon */}
											<Popup
												lockScroll
												trigger={open => (
													<div className="icon" >
														<img src={require('../../assets/images/png/menu-button.png')} alt="bell" className="bell" />
													</div>
												)}
												position="bottom center"
												className="_bell"
												closeOnDocumentClick
												modal

											>
												<div className="popup-notification">
													<div className="menubaricon-model">
														<div className="avatar-model-header">
															<div className="avatardiv">
																<img className="avatarimagemobile" src={LocalProfilePic === null ? defaultImageURL : LocalProfilePic} alt="Profile Pic" />
															</div>

															<div className="account-name">
																<div className="profile_name">{name}</div>
															</div>
														</div>
														<div className="menuroutes-model-body">
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.HOME, "Home")}>
																Home
										 					 </div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.FAVORITES, "Favorites")}>
																Favorites
										 					 </div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.CHATS, "All Chats")}>
																Chats
										 					 </div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.JOBS, "All Jobs")}>
																Jobs
										 					 </div>

															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.MYACCOUNT, "My Account")}>
																My Account
										 					</div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.HELP, "Help")}>
																Help
										 					</div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.handleLogout()}>
																Logout
													   		</div>
															<hr />
														</div>
													</div>
												</div>
											</Popup>
										</div>
										: null}
									{/*For Admin Menu */}
									{role === "Admin" ?
										<div className="menumobile">
											{/* Menu icon */}
											<Popup
												trigger={open => (
													<div className="icon" >
														<img src={require('../../assets/images/png/menu-button.png')} alt="bell" className="bell" />
													</div>
												)}
												position="bottom center"
												className="_bell"
												closeOnDocumentClick
												lockScroll
											>
												<div className="popup-notification">
													<div className="menubaricon-model">
														<div className="avatar-model-header">
															<div className="avatardiv">
																<img className="avatarimagemobile" src={LocalProfilePic === null ? defaultImageURL : LocalProfilePic} alt="Profile Pic" />
															</div>

															<div className="account-name">
																<div className="profile_name">{name}</div>
															</div>
														</div>
														<div className="menuroutes-model-body">
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.HOME)}>
																Dashboard
														</div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.ADMIN_MEMBERS, "Members")}>
																Members
														</div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.JOBS, "Job Orders")} >
																Job Orders
													 	</div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.routeNavigation(ROUTES.ADMIN_SETTINGS, "Settings")}>
																Settings
													  	</div>
															<hr />
															<div className="menuroutesdata" onClick={() => this.handleLogout()}>
																Logout
													  	</div>
															<hr />
														</div>
													</div>
												</div>
											</Popup>
										</div>
										: null}
								</div>
							</div>
						</Col>
					</Row>
					<Loading isloading={this.props.isloading || this.props.favrouites || this.props.providers || this.props.jobList} />
				</div >
			)
		else return null
	}

}

function mapStateToProps({ rSession, rLoading, rServerData, rTalkJsUsers }) {

	return {
		user: rSession,
		isloading: rLoading.logout,
		favrouites: rLoading.favorites,
		providers: rLoading.providers,
		notification: rServerData.notification,
		jobList: rLoading.jobList,
		talkjsUsers: rTalkJsUsers.talkjsUsers || []
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		ActionRouteNavigate,
		ActionGetNotification,
		ActionLogout
	}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)