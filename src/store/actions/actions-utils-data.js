import ACTIONS from '../actions-names/index'
import { ActionLoadingUpdate } from './actions-loading'
import UtilsData from '../../api/utils-data'
import _ from 'lodash'
import { openAntdNotification } from '../../services/notifications'

const { UTILS_ACTIONS } = ACTIONS

export function ActionUtilsData(ns, payload) {
  const data = {}
  data[ns] = payload
  return {
    type: UTILS_ACTIONS.UPDATEDATA,
    data
  }
}

export function ActionGetCountry(params) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('country', true))

    UtilsData.getCountry(params)
      .then(res => {
        if (res.success) {
          const data = _.sortBy(res.data, obj => obj.label.toLowerCase())
          dispatch(ActionUtilsData('country', { ...res, data }))
        }
        else
          dispatch(ActionUtilsData('country', res))
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('country', false)))
  }
}

export function ActionGetState(params) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('state', true))
    UtilsData.getState(params)
      .then(res => {
        if (res.success) {
          const data = _.sortBy(res.data, obj => obj.label.toLowerCase())
          dispatch(ActionUtilsData('state', { ...res, data }))
        } else {
          dispatch(ActionUtilsData('state', res))
        }

      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('state', false)))
  }
}

export function ActionGetCity(params) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('city', true))

    UtilsData.getCity(params)
      .then(res => {
        if (res.success) {
          const data = _.sortBy(res.data, obj => obj.label.toLowerCase())
          dispatch(ActionUtilsData('city', { ...res, data }))
        }
        else
          dispatch(ActionUtilsData('city', res))
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('city', false)))
  }
}

export function ActionGetQualification(params) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('qualification', true))

    UtilsData.getQualification(params)
      .then(res => dispatch(ActionUtilsData('qualification', res.data)))
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('qualification', false)))
  }
}

export function ActionGetServices(params) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('services', true))
    UtilsData.getServices(params)
      .then(res => dispatch(ActionUtilsData('services', res.data)))
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('services', false)))
  }
}

export function ActionGetBanks(params) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('banks', true))

    UtilsData.getBank()
      .then(res => {
        if (res.success)
          dispatch(ActionUtilsData('banks', res.data))
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('banks', false)))
  }
}

export function ActionUpdateQualification(params, header) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('updateQualification', true))
    UtilsData.updateQualification(params, header)
      .then(res => {
        dispatch(ActionUtilsData('updateQualification', res))
        if (res.success) {
          dispatch(ActionGetQualification())
          openAntdNotification({
            type: "success",
            title: "Success..!!",
            message: res.message,
          });
        }
        else
          openAntdNotification({
            type: "error",
            title: "Failed",
            message: res.message,
          });
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('updateQualification', false)))
  }
}

export function ActionUpdateService(params, header) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('updateService', true))

    UtilsData.updateService(params, header)
      .then(res => {
        dispatch(ActionUtilsData('updateService', res))
        if (res.success) {
          dispatch(ActionGetServices())
          openAntdNotification({
            type: "success",
            title: "Success..!!",
            message: res.message,
          });
        }
        else
          openAntdNotification({
            type: "error",
            title: "Failed",
            message: res.message,
          });
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('updateService', false)))
  }
}

export function ActionGetAllStates() {
  return dispatch => {
    dispatch(ActionLoadingUpdate('getAllStates', true))

    UtilsData.getAllStateList()
      .then(res => {
        if (res.success)
          dispatch(ActionUtilsData('getAllStates', res.data))
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('getAllStates', false)))
  }
}
export function ActionGetAllCities() {
  return dispatch => {
    dispatch(ActionLoadingUpdate('getAllCities', true))

    UtilsData.getAllCitiesList()
      .then(res => {
        if (res.success) {
          dispatch(ActionUtilsData('getAllCities', res.data))
        }
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('getAllCities', false)))
  }
}

export function ActionAddUpdateState(params, header) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('addUpdateState', true))

    UtilsData.updateState(params, header)
      .then(res => {
        dispatch(ActionUtilsData('addUpdateState', res))
        if (res.success) {
          dispatch(ActionGetAllStates())
          openAntdNotification({
            type: "success",
            title: "Success..!!",
            message: res.message,
          });
        }
        else
          openAntdNotification({
            type: "error",
            title: "Failed",
            message: res.message,
          });
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('addUpdateState', false)))
  }
}

export function ActionAddUpdateCity(params, header) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('addUpdateCity', true))

    UtilsData.updateCity(params, header)
      .then(res => {
        dispatch(ActionUtilsData('addUpdateCity', res))
        if (res.success) {
          dispatch(ActionGetAllCities());
          openAntdNotification({
            type: "success",
            title: "Success..!!",
            message: res.message,
          });
        }
        else
          openAntdNotification({
            type: "error",
            title: "Failed",
            message: res.message,
          });
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('addUpdateCity', false)))
  }
}

export function ActionGetAllJobsForAdmin(params, header) {
  return dispatch => {
    dispatch(ActionLoadingUpdate('allJobAdmin', true))
    UtilsData.getAllJobordersForAdmin(params, header)
      .then(res => {
        if (res.success) {
          dispatch(ActionUtilsData('allJobAdmin', res))
        }
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('allJobAdmin', false)))
  }
}

export function ActionGetPriceConstants() {
  return dispatch => {
    dispatch(ActionLoadingUpdate('priceConstants', true))
    UtilsData.getPriceConstants()
      .then(res => {
        if (res.success) {
          dispatch(ActionUtilsData('priceConstants', res))
        }
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate('priceConstants', false)))
  }
}
