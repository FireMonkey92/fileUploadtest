import ACTIONS from "../actions-names/index";
import { ActionLoadingUpdate } from "./actions-loading";
import ServerData from "../../api/server-data";
import USERAPI from "../../api/user";

const { SERVER_DATA_ACTIONS } = ACTIONS;

export function ActionServerData(ns, payload) {
  const data = {};
  data[ns] = payload;
  return {
    type: SERVER_DATA_ACTIONS.GET_ALL_PROVIDERS,
    data,
  };
}

export function ActionGetAllProvider(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("providers", true));
    ServerData.getAllProviders(params, header)
      .then((res) => {
        if (res.success) dispatch(ActionServerData("providers", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("providers", false)));
  };
}

export function ActionGetUserDetails(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("userDetails", true));

    USERAPI.getUserDetails(params, header)
      .then((res) => {
        dispatch(ActionServerData("userDetails", res.userDetails));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("userDetails", false)));
  };
}

export function ActionGetProviderDetails(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("providerDetails", true));
    ServerData.getProviderDetails(params, header)
      .then((res) => {
        if (res.success) {
          const data = {
            providerDetails: res.providerDetails,
            services: res.services,
          };
          dispatch(ActionServerData("providerDetails", data));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("providerDetails", false)));
  };
}

export function ActionGetFavorites(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("favorites", true));

    ServerData.getAllFavoriates(params, header)
      .then((res) => {
        if (res.success) dispatch(ActionServerData("favorites", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("favorites", false)));
  };
}

export function ActionGetJobList(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("jobList", true));

    ServerData.getJobList(params, header)
      .then((res) => {
        if (res.success) dispatch(ActionServerData("jobList", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("jobList", false)));
  };
}

export function ActionGetJobDetails(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("jobDetails", true));

    ServerData.getJobDetails(params, header)
      .then((res) => {
        if (res.success) dispatch(ActionServerData("jobDetails", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("jobDetails", false)));
  };
}

export function ActionGetServiceByProvider(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("serviceByProvider", true));
    ServerData.getServiceByProvider(params, header)
      .then((res) => {
        if (res.success)
          dispatch(ActionServerData("serviceByProvider", res.data));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("serviceByProvider", false)));
  };
}

export function ActionGetProviderDashboardDetails(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("providerDashboardDetails", true));

    ServerData.getProviderDashboardDetails(params, header)
      .then((res) => {
        if (res.success)
          dispatch(
            ActionServerData("providerDashboardDetails", res.dashboardDetails)
          );
      })
      .catch((err) => console.log(err))
      .finally(() =>
        dispatch(ActionLoadingUpdate("providerDashboardDetails", false))
      );
  };
}
export function ActionGetAdminDashboardDetails(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("adminDashboardDetails", true));

    ServerData.getProviderDashboardDetails(params, header)
      .then((res) => {
        if (res.success)
          dispatch(
            ActionServerData("adminDashboardDetails", res.dashboardDetails)
          );
      })
      .catch((err) => console.log(err))
      .finally(() =>
        dispatch(ActionLoadingUpdate("adminDashboardDetails", false))
      );
  };
}

export function ActionGetBankDetails(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("bankdetails", true));

    ServerData.getBankDetails(params, header)
      .then((res) => {
        if (res.success)
          dispatch(ActionServerData("bankdetails", res.bankdetails));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("bankdetails", false)));
  };
}

export function ActionGetUsers(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("Members", true));

    ServerData.getUsers(params, header)
      .then((res) => dispatch(ActionServerData("Members", res)))
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("Members", false)));
  };
}

export function ActionGetNotification(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("notification", true));

    ServerData.getNotification(params, header)
      .then((res) => dispatch(ActionServerData("notification", res)))
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("notification", false)));
  };
}

export function ActionGetFeedbacks(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("feedbacks", true));
    ServerData.getUserFeedBacks(params, header)
      .then((res) => {
        dispatch(ActionServerData("feedbacks", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("feedbacks", false)));
  };
}
