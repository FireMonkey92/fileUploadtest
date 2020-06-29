import { URL_MAP } from '../constants/urls';
import { generatePath } from 'react-router';

const {
  BASE_URL,
  LOGIN,
  HOME,
  DETAILSPAGE,
  SIGNUP,
  FAVORITES,
  CHATS,
  JOBS,
  NOTIFICATION,
  FORGOTPASSWORD,
  MYACCOUNT,
  CHANGEPASSWORD,
  CREATEJOB,
  PROVIDERDASHBOARD,
  PAYMENT,
  VERIFYMOBILE,
  SIGNINUSER,
  HELP,
  SERVICES,
  ADMIN_SETTINGS,
  ADMIN_MEMBERS,
  ADMIN_JOB_ORDER,
  FAQ,
  PRIVACY,
  TERMS,
  VERIFYEMAIL,
  PAYMENTSUCCESS
} = URL_MAP;

export const buildRoute = (...args) => {
  return (
    args.reduce((prevRoute, item) => {
      return prevRoute + (typeof item === 'number' || item.indexOf('(') === -1 ? `/${item}` : item);
    }, '')
  );
};

export const applyRouteParams = (path, params) => {
  return generatePath(path, params);
};

const ROUTES = {
  ROOT: `/${BASE_URL}`,
  LOGIN: buildRoute(LOGIN),
  HOME: buildRoute(HOME),
  SIGNUP: buildRoute(SIGNUP),
  FAVORITES: buildRoute(FAVORITES),
  DETAILSPAGE: buildRoute(DETAILSPAGE),
  JOBS: buildRoute(JOBS),
  CHATS: buildRoute(CHATS),
  NOTIFICATION: buildRoute(NOTIFICATION),
  FORGOTPASSWORD: buildRoute(FORGOTPASSWORD),
  MYACCOUNT: buildRoute(MYACCOUNT),
  CHANGEPASSWORD: buildRoute(CHANGEPASSWORD),
  CREATEJOB: buildRoute(CREATEJOB),
  PROVIDERDASHBOARD: buildRoute(PROVIDERDASHBOARD),
  PAYMENT: buildRoute(PAYMENT),
  VERIFYMOBILE: buildRoute(VERIFYMOBILE),
  SIGNINUSER: buildRoute(SIGNINUSER),
  HELP: buildRoute(HELP),
  SERVICES: buildRoute(SERVICES),
  ADMIN_SETTINGS: buildRoute(ADMIN_SETTINGS),
  ADMIN_MEMBERS: buildRoute(ADMIN_MEMBERS),
  ADMIN_JOB_ORDER: buildRoute(ADMIN_JOB_ORDER),
  FAQ: buildRoute(FAQ),
  PRIVACY: buildRoute(PRIVACY),
  TERMS: buildRoute(TERMS),
  VERIFYEMAIL: buildRoute(VERIFYEMAIL),
  PAYMENTSUCCESS: buildRoute(PAYMENTSUCCESS) // VIEW_MODULE: buildRoute(VIEW_MODULE, ':id'),
};
export default ROUTES;
