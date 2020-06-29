/* eslint-disable indent */
import initialServerDataModel from '../models/server-data-model';
import ACTIONS from '../actions-names/index'


const { SERVER_DATA_ACTIONS } = ACTIONS;

export default (state = initialServerDataModel(), action) => {
  // debugger
  switch (action.type) {
    case SERVER_DATA_ACTIONS.GET_ALL_PROVIDERS: {
      if (action.key) {
        return {
          ...state,
          [action.key]: action.data,
        };
      }
      return {
        ...state,
        ...action.data,
      };

    }
    case SERVER_DATA_ACTIONS.GET_PROVIDER_DETAILS: {
      if (action.key) {
        return {
          ...state,
          [action.key]: action.data,
        };
      }
      return {
        ...state,
        ...action.data,
      };

    }

    default:
      return {
        ...state,
      };
  }
};
