import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { ActionRouteNavigate } from '../../store/actions/actions-route';
import { buildRoute } from "../../configs/routes";
import { connect } from 'react-redux';
import { URL_MAP } from "../../constants/urls";
import { bindActionCreators } from "redux";
import ROUTES from "../../configs/routes";

import './HeaderLanding.less';
import ModalSignUp from '../ModalSignUp/ModalSignUp';

class HeaderLanding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false
		};
	}
	GoToUserSignUp = () => {
		this.setState({ modalIsOpen: false })
		this.props.ActionRouteNavigate(buildRoute(URL_MAP.SIGNUP), {
			SIGNUP: "USER",
			headerName: "Create User Account"
		});
	};

	GoToProviderSignUp = () => {
		this.setState({ modalIsOpen: false })
		this.props.ActionRouteNavigate(buildRoute(URL_MAP.SIGNUP), {
			SIGNUP: "PROVIDER",
			headerName: "Create Provider Account"
		});
	};

	render() {
		return (
			<div className="headerForLanding">
				<Row type="flex" justify="center" className="header-body">
					<Col xs={23} sm={22} md={19} lg={17}>
						<div className="landing-page-header-container">
							<div
								className="logo"
								onClick={() => this.props.ActionRouteNavigate(ROUTES.HOME)}>
								<img
									src={require("../../assets/images/png/logo.png")}
									alt="logo"
								/>
							</div>
							<div className="links">
								{/* <div>ABOUT US</div>
								<div onClick={() => this.props.ActionRouteNavigate(ROUTES.HELP, { headerName: "Help" })}>
									HELP
                  				</div>
								<div onClick={() => this.props.ActionRouteNavigate(ROUTES.FAQ, { headerName: "Frequently asked Questions" })}>FAQ</div> */}
								<div onClick={() => this.props.ActionRouteNavigate(ROUTES.SIGNINUSER, { headerName: "Sign In" })}>
									LOG IN
                  				</div>
								<div onClick={() => this.setState({ modalIsOpen: true })}>
									SIGN UP
                  			</div>
							</div>
						</div>
					</Col>
				</Row>

				<ModalSignUp
					open={this.state.modalIsOpen}
					close={() => this.setState({ modalIsOpen: false })}
					user={this.GoToUserSignUp}
					provider={this.GoToProviderSignUp}
				/>
			</div >

		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		ActionRouteNavigate
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(HeaderLanding)
