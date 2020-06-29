import ACTIONS from '../actions-names';

const { SESSION_ACTIONS } = ACTIONS;

export function ActionSessionStart(key, ns, userDetails) {
    let data = {};
    data[key] = ns;
    data = {
        ...data,
        ...userDetails
    }
    return {
        type: SESSION_ACTIONS.START,
        data
    }
}

export function ActionUpdateSession(key, data) {
    return {
        type: SESSION_ACTIONS.UPDATE,
        key,
        data
    }
}

export function ActionSessionClear() {
    return {
        type: SESSION_ACTIONS.CLEAR,
    }
}