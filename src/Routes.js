import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { auth, notAuth, checkRole } from "./utils/utils-auth";
//components
import RootLayout from './components/RootLayout/RootLayout';
import HomePage from './pages/User/HomePage/HomePage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import Favorites from './pages/User/Favorites/Favorites';
import Chats from './pages/Chats/Chats';
import Jobs from './pages/Jobs/Jobs';
import LandingPage from './pages/LandingPage/LandingPage'
import NotificationPage from './pages/NotificationPage/NotificationPage';
import MyAccountPage from './pages/MyAccountPage/MyAccountPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ROUTES from './configs/routes';
import CreateJobs from './pages/CreateJobs/CreateJobs';
import Dashboard from './pages/Provider/Dashboard/Dashboard';
import PaymentPage from './pages/Provider/PaymentPage/PaymentPage';
import VerifyMobile from './pages/VerifyPage/VerifyNumber';
import SigningInNew from './pages/SigningInNew/SigningInNew';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import HelpPage from './pages/HelpPage/HelpPage';
import ServicesPage from './pages/Provider/ServicesPage/ServicesPage';
import ProviderMyAccount from './pages/Provider/MyAccount/ProviderMyAccount';
import MembersPage from './pages/Admin/MembersPage/MembersPage';
import AdminJobOrder from './pages/Admin/AdminJobOrder/AdminJobOrder';
import Settings from "./pages/Admin/Settings/Settings";
import FaqPage from "./pages/FaQ/FaQ";
import PrivacyPage from './pages/Terms&Privacy/PrivacyPage';
import Terms from './pages/Terms&Privacy/Terms'
import EmailVerification from './pages/EmailVerification/EmailVerification'
import PaymentSuccess from './pages/User/PaymentSuccess/PaymentSuccess'

const Routes = () => {
	return (
		<RootLayout>
			<Switch>
				{/* Not Auth Route */}
				<Route exact path={ROUTES.LOGIN} component={notAuth(LandingPage)} />
				<Route exact path={ROUTES.SIGNINUSER} component={notAuth(SigningInNew)} />
				<Route exact path={ROUTES.SIGNUP} component={notAuth(SignupPage)} />
				<Route exact path={ROUTES.VERIFYMOBILE + '/:id'} component={notAuth(VerifyMobile)} />
				<Route exact path={ROUTES.FAQ} component={FaqPage} />
				<Route exact path={ROUTES.HELP} component={HelpPage} />
				<Route exact path={ROUTES.PRIVACY} component={PrivacyPage} />
				<Route exact path={ROUTES.TERMS} component={Terms} />
				<Route exact path={ROUTES.VERIFYEMAIL} component={notAuth(EmailVerification)} />

				{/* Auth Route */}
				<Route exact path={ROUTES.HOME} component={auth(checkRole(HomePage, Dashboard, AdminDashboard))} />
				<Route exact path={ROUTES.NOTIFICATION} component={auth(checkRole(NotificationPage, NotificationPage, null))} />
				<Route exact path={ROUTES.DETAILSPAGE} component={auth(checkRole(DetailsPage, null, null))} />
				<Route exact path={ROUTES.FAVORITES} component={auth(checkRole(Favorites, null, null))} />
				<Route exact path={ROUTES.CHATS} component={auth(checkRole(Chats, Chats, null))} />
				<Route exact path={ROUTES.JOBS} component={auth(checkRole(Jobs, Jobs, AdminJobOrder))} />
				<Route exact path={ROUTES.MYACCOUNT} component={auth(checkRole(MyAccountPage, ProviderMyAccount, null))} />
				<Route exact path={ROUTES.CREATEJOB} component={auth(checkRole(CreateJobs, null, null))} />
				<Route exact path={ROUTES.PAYMENT} component={auth(checkRole(null, PaymentPage, null))} />
				<Route exact path={ROUTES.SERVICES} component={auth(checkRole(null, ServicesPage, null))} />
				<Route exact path={ROUTES.ADMIN_SETTINGS} component={auth(checkRole(null, null, Settings))} />
				<Route exact path={ROUTES.ADMIN_MEMBERS} component={auth(checkRole(null, null, MembersPage))} />
				<Route exact path={ROUTES.PAYMENTSUCCESS} component={auth(checkRole(PaymentSuccess, null, null))} />
				<Redirect from="/" to={ROUTES.HOME} />
			</Switch>
		</RootLayout>
	)
};

export default Routes;
