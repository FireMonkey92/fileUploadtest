import React, { Component } from 'react';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import ACTIONS from '../store/actions-names';
import ROUTES from '../configs/routes';
import { getState } from "../store/store";
import ErrorPage404 from "../pages/ErrorPage404/ErrorPage404";

const locationHelper = locationHelperBuilder({});
const { USER_ACTIONS } = ACTIONS;

export const auth = connectedRouterRedirect({
	allowRedirectBack: true,
	authenticatedSelector: state => !!state.rSession[USER_ACTIONS.LOGGED_IN],
	redirectPath: (state, ownProps) => {
		if (ownProps.location.pathname.indexOf('?') === -1) {
			return ROUTES.LOGIN;
		}
		return locationHelper.getRedirectQueryParam(ownProps) || ROUTES.LOGIN;
	},
	wrapperDisplayName: 'UserIsAuthenticated',
});

export const notAuth = connectedRouterRedirect({
	allowRedirectBack: false,
	authenticatedSelector: state => !state.rSession[USER_ACTIONS.LOGGED_IN],
	redirectPath: (state, ownProps) => {
		if (ownProps.location.pathname.indexOf('?') === -1) {
			return ROUTES.ROOT;
		}
		return locationHelper.getRedirectQueryParam(ownProps) || ROUTES.ROOT;
	},
	wrapperDisplayName: 'UserIsNotAuthenticated',
});

export const checkRole = (User, Provider, Admin) => {
	class CheckRole extends Component {
		constructor(props) {
			super(props)
			this._currentState = getState();
		}
		render() {
			const { rSession } = this._currentState;
			if (rSession.role === "Member")
				return (User === null) ? <ErrorPage404 /> : <User {...this.props} />
			else if (rSession.role === "Provider" || rSession.role === "Organization")
				return (Provider === null) ? <ErrorPage404 /> : <Provider {...this.props} />
			else if (rSession.role === "Admin")
				return (Admin === null) ? <ErrorPage404 /> : <Admin {...this.props} />
		}
	}
	CheckRole.displayName = `CheckRole`;
	return CheckRole;
}