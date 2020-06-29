/* globals window */

import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { RootReducer } from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const syncConfig = {
  blacklist: ['persist/PERSIST'],
  whitelist: ['LOGOUT', 'LOGIN_REQUEST', 'LOGGED_IN', 'SESSION_START', 'SESSION_CLEAR'],
};

export const history = createBrowserHistory({
  basename: '',
});

const persistedReducer = persistReducer({
  key: 'store',
  storage,
  whitelist: ['rSession', 'rTalkJsUsers', 'rUtils'],
}, RootReducer(history));


const middlewares = [
  thunk,
  routerMiddleware(history),
  createStateSyncMiddleware(syncConfig)
];


export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);
initMessageListener(store);
export const getState = () => store.getState();
export const persistor = persistStore(store);
