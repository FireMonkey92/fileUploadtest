import ACTIONS from '../actions-names';
import { ActionLoadingUpdate } from './actions-loading';
import ServerData from '../../api/server-data';

const { TALKJS_ACTIONS } = ACTIONS;

export function ActionUpdateTalkJsUsers(key, ns) {
    let data = {};
    data[key] = ns;
    data = {
        ...data,
    }
    return {
        type: TALKJS_ACTIONS.GET_ALL_USERS,
        data,
    }
}

export function ActionClearTalkJsUsers() {
    return {
        type: TALKJS_ACTIONS.CLEAR_ALL_USERS,
    }
}

export function ActionGetTalkJsProvider(userId) {
    return (dispatch) => {
        dispatch(ActionLoadingUpdate("talkjsProvider", true));
        ServerData.getTalkJSUsers(userId)
            .then((res) => {
                if (!res.errorCode) {
                    dispatch(ActionUpdateTalkJsUsers("talkjsProvider", res))
                }
                if (res.errorCode) {
                    dispatch(ActionUpdateTalkJsUsers("talkjsProvider", undefined))
                }
            })
            .catch((err) => console.log(err))
            .finally(() => dispatch(ActionLoadingUpdate("talkjsProvider", false)));
    };
}
export function ActionGetTalkJsMember(userId) {
    return (dispatch) => {
        dispatch(ActionLoadingUpdate("talkjsMember", true));
        ServerData.getTalkJSUsers(userId)
            .then((res) => {
                if (!res.errorCode) {
                    dispatch(ActionUpdateTalkJsUsers("talkjsMember", res))
                }
                if (res.errorCode) {
                    dispatch(ActionUpdateTalkJsUsers("talkjsMember", undefined))
                }
            })
            .catch((err) => console.log(err))
            .finally(() => dispatch(ActionLoadingUpdate("talkjsMember", false)));
    };
}