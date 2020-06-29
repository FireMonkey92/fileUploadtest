import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from 'antd';
import Popup from "reactjs-popup";
import { ActionRouteNavigate } from "../../store/actions/actions-route";
import { ActionLogout } from "../../store/actions/actoins-user";
import ROUTES from "../../configs/routes";

import './HeaderVerify.less'


class Header extends Component {

	routeNavigation = (loaction) => {
		this.props.ActionRouteNavigate(loaction);
	}

	render() {

		return (
			<div className="headerVerify">
				<Row type="flex" justify="center" className="header-body">
					<Col xs={23} sm={22} md={19} lg={17}>
						<div className="header-container">
							<div className="align-center">
								<div className="logo" onClick={() => this.routeNavigation(ROUTES.HOME)}>
									<img src={require('../../assets/images/png/logo_white.png')} alt="logo" />
								</div>
								<div className="mobileheader">
									<div className="mobileheaderimage" onClick={() => this.routeNavigation(ROUTES.HOME)}>
										<img src={require('../../assets/images/png/left-arrow.png')} alt="back" />
									</div>
									<div className="mobileheaderheader">
										<h3>{this.props.location.state ? this.props.location.state.headerName : ''}</h3>
									</div>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div >
		)
	}
}

function mapStateToProps({ rSession }) {
	return {
		user: rSession
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		ActionRouteNavigate,
		ActionLogout
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)