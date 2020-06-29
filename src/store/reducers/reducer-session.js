import ACTIONS from '../actions-names';

const { SESSION_ACTIONS } = ACTIONS;

export default (state = {}, action) => {
    switch (action.type) {
        case SESSION_ACTIONS.START:
            if (action.key)
                return {
                    [action.key]: action.data
                }

            return {
                ...state,
                ...action.data
            }

        case SESSION_ACTIONS.UPDATE:
            if (action.key)
                return {
                    [action.key]: action.data
                }

            return {
                ...state,
                ...action.data
            }

        case SESSION_ACTIONS.CLEAR:

            return {};

        default:
            return state;
    }
}