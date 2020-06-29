import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import rSession from "./reducer-session";
import rServerData from './reducer-server-data';
import rLoading from './reducer-loading';
import rUser from './reducer-user';
import rUtils from "./reducer-utils";
import rTalkJsUsers from './reducer-talkjs-users'

export const RootReducer = history => (
  combineReducers({
    router: connectRouter(history),
    rServerData,
    rLoading,
    rSession,
    rUser,
    rUtils,
    rTalkJsUsers
  })
);
