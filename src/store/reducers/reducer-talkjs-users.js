import ACTIONS from "../actions-names/index";
const { TALKJS_ACTIONS } = ACTIONS;

export default (state = {}, action) => {
    switch (action.type) {
        case TALKJS_ACTIONS.GET_ALL_USERS:
            if (action.key)
                return {
                    ...state,
                    [action.key]: action.data
                }
            return {
                ...state,
                ...action.data
            }
        case TALKJS_ACTIONS.CLEAR_ALL_USERS:
            return {};

        default:
            return state;
    }
}