import { UTILS_ACTIONS } from "../actions-names/utils";

export default function (state = {}, action) {

    switch (action.type) {
        case UTILS_ACTIONS.UPDATEDATA:
            return {
                ...state,
                ...action.data
            }

        default:
            return state;
    }
}