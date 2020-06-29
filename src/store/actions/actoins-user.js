import ACTIONS from "../actions-names/index";
import USERAPI from "../../api/user";
import ServerData from "../../api/server-data";
import { ActionLoadingUpdate } from "./actions-loading";
import { ActionRouteNavigate } from "./actions-route";
import {
  ActionServerData,
  ActionGetFeedbacks,
  ActionGetNotification,
} from "./actions-server-data";
import { ActionGetProviderDetails } from '../../store/actions/actions-server-data'
import { ActionGetTalkJsProvider, ActionGetTalkJsMember, ActionClearTalkJsUsers } from './actions-talkjs-users'
import { ActionSessionClear, ActionSessionStart } from "./actions-session";
import ROUTES from "../../configs/routes";
import {
  notificationError,
  openAntdNotification,
} from "../../services/notifications";
import {
  ActionGetJobList,
  ActionGetBankDetails,
  ActionGetUsers,
} from "./actions-server-data";

const { USER_ACTIONS } = ACTIONS;

export function ActionUserUpdate(key, data) {
  return {
    type: USER_ACTIONS.UPDATE,
    key,
    data,
  };
}

export function ActionUserClear() {
  return {
    type: USER_ACTIONS.CLEAR,
  };
}

export function ActionLogin(params) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("login", true));
    USERAPI.login(params)
      .then((res) => {
        let userDetails = {};
        if (!res.success) {
          openAntdNotification({
            type: "error",
            title: "Sign In Failed",
            message: res.message,
          });
        }
        if (res.success) {
          if (res.imageURL !== "") {
            localStorage.setItem("USER_PROFILE_PIC", res.imageURL);
          }
          userDetails = {
            ...res,
            LOGGED_IN: true,
            email: res.email,
            mobileNumber: params.mobileNumber,
          };
          if (userDetails.role === "Member") {
            dispatch(ActionGetTalkJsMember(userDetails.id))
          }
          if (userDetails.role === "Provider") {
            dispatch(ActionGetTalkJsProvider(userDetails.id))
          }
          if (userDetails.role === "Organization") {
            dispatch(ActionGetTalkJsProvider(userDetails.id))
          }
          dispatch(ActionSessionStart("authenticated", true, userDetails));
          dispatch(ActionRouteNavigate(ROUTES.HOME));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("login", false)));
  };
}

export function ActionAuthenticate(params) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("authenticate", true));
    USERAPI.authenticateUser(params)
      .then((res) => {
        if (!res.success) {
          openAntdNotification({
            type: "error",
            title: "Failed",
            message: res.message,
          });
        }
        if (res.success) {
          openAntdNotification({
            type: "success",
            title: "Succeess",
            message: res.message,
          });
        }
        dispatch(ActionUserUpdate("authenticationResponce", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("authenticate", false)));
  };
}

export function ActionVeifyEmailAddress(params) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("verifyEmail", true));
    USERAPI.varifyEmail(params)
      .then((res) => {
        if (!res.success) {
          openAntdNotification({
            type: "error",
            title: "Failed",
            message: res.message,
          });
        }
        dispatch(ActionUserUpdate("verifyEmail", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("verifyEmail", false)));
  };
}

export function ActionLogout(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("logout", true));

    USERAPI.logout(params, header)
      .then((res) => {
        dispatch({ type: USER_ACTIONS.LOGOUT });
        dispatch(ActionSessionClear());
        dispatch(ActionUserUpdate());
        dispatch(ActionClearTalkJsUsers());
        dispatch(ActionRouteNavigate(ROUTES.ROOT));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("logout", false)));
  };
}

export function ActionVerifyMobileNumber(params) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("verifyMobile", true));
    USERAPI.varifyMobile(params)
      .then((res) => {
        dispatch(ActionUserUpdate("mobileVerificationResponce", res));
        if (params.verifyFromLogin) {
        }
        else {
          setTimeout(() => dispatch(ActionUserUpdate()), 5000);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("verifyMobile", false)));
  };
}

export function ActionUserRegistration(params) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("signupuser", true));
    USERAPI.userSignup(params)
      .then((res) => {
        if (!res.success && res.message) {
          openAntdNotification({
            type: "error",
            title: "Signup Failed",
            message: res.message,
          });
        }
        dispatch(ActionUserUpdate("newUser", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("signupuser", false)));
  };
}

export function ActionIndependentRegister(params) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("independent", true));
    USERAPI.IndependentSignUp(params)
      .then((res) => {
        if (!res.success && res.message) {
          openAntdNotification({
            type: "error",
            title: "Signup Failed",
            message: res.message,
          });
        }
        dispatch(ActionUserUpdate("newUser", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("independent", false)));
  };
}

export function ActionOrganizationRegister(params) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("organization", true));
    USERAPI.OrgainsationSignUp(params)
      .then((res) => {
        if (!res.success && res.message) {
          openAntdNotification({
            type: "error",
            title: "Signup Failed",
            message: res.message,
          });
        }
        dispatch(ActionUserUpdate("newUser", res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("organization", false)));
  };
}

export function ActionGetUserDetails(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("userDetails", true));

    USERAPI.getUserDetails(params, header)
      .then((res) => {
        dispatch(ActionUserUpdate("userDetails", res.userDetails[0]));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("userDetails", false)));
  };
}

export function ActionAddFav(params, header, type, extraParams) {
  return async (dispatch) => {
    dispatch(ActionLoadingUpdate("addfav", true));

    await USERAPI.addFav(params, header)
      .then((res) => dispatch(ActionUserUpdate(res)))
      .catch((err) => console.log(err));
    if (type.pageType === "FAV") {
      ServerData.getAllFavoriates(extraParams, header)
        .then((res) => {
          if (res.success) dispatch(ActionServerData("favorites", res));
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(ActionLoadingUpdate("addfav", false)));
    } else if (type.pageType === "HOME") {
      ServerData.getAllProviders(extraParams, header)
        .then((res) => {
          if (res.success) dispatch(ActionServerData("providers", res));
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(ActionLoadingUpdate("addfav", false)));
    } else {
      dispatch(ActionLoadingUpdate("addfav", false));
    }
  };
}

export function ActionCreateJob(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("createJob", true));

    USERAPI.createJob(params, header)
      .then((res) => {
        if (res.success) {
          dispatch(ActionUserUpdate("createJob", res));
          openAntdNotification({
            type: "success",
            title: "Job Created..!!",
            message: "Job has been created successfully",
          });
          dispatch(
            ActionRouteNavigate(ROUTES.JOBS, { headerName: "All Jobs" })
          );
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("createJob", false)));
  };
}

export function ActionClearUser() {
  return (dispatch) => {
    dispatch(ActionUserClear());
  };
}

export function ActionChangeJobStatus(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("changeJobStatus", true));

    USERAPI.changeJobStatus(params, header)
      .then((res) => {
        dispatch(ActionUserUpdate("changeJobStatus", res));

        const listParams = {
          userId: params.userId,
          pgSkip: 0,
          pgLimit: 10,
          // sortBy: "statusId",
          sortBy: "jobId",
          sortByFlag: 1,
        };
        dispatch(ActionGetJobList(listParams, header));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("changeJobStatus", false)));
  };
}

export function ActionStoreBankDetails(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("bankdetails", true));

    USERAPI.bankDetails(params, header)
      .then((res) => {
        console.log(res);
        dispatch(ActionUserUpdate("bankdetails", res));
        if (res.success) {
          dispatch(ActionGetBankDetails(params.userId, header));
          openAntdNotification({
            type: "success",
            title: "Saved..!!",
            message: res.message,
          });
        }
        else {
          openAntdNotification({
            type: "error",
            title: "Failed..!!",
            message: res.message.message,
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("bankdetails", false)));
  };
}

export function ActionUploadFile(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("uploadFile", true));

    USERAPI.uploadFile(params, header)
      .then((res) => {
        if (res.success) {
          if (params.flag === "P") {
            if (params.base64Content !== "") {
              localStorage.setItem("USER_PROFILE_PIC", params.base64Content);
              openAntdNotification({
                type: "success",
                title: "Successfully Updated..!!",
                message: "Profile Image Updated Successfully",
              });
            }
            if (params.base64Content === "") {
              localStorage.removeItem("USER_PROFILE_PIC");
              openAntdNotification({
                type: "success",
                title: "Successfully Updated..!!",
                message: "Profile Image Removed Successfully",
              });
            }
          }
        }
        // else {
        //   openAntdNotification({
        //     type: "error",
        //     title: "Failed",
        //     message: res.message,
        //   });
        // }
        dispatch(ActionUserUpdate("uploadFile", res));
        dispatch(ActionGetUserDetails(params.userId, header));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("uploadFile", false)));
  };
}

export function ActionUpdateServicePrice(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("servicePrice", true));

    USERAPI.updateServicePrice(params, header)
      .then((res) => {
        if (res.success) {
          console.log(res);
          dispatch(ActionUserUpdate("servicePrice", res));
          openAntdNotification({
            type: "success",
            title: "Successfully Updated",
            message: res.message,
          });
        }
        if (!res.success) {
          openAntdNotification({
            type: "error",
            title: "Something went wrong",
            message: res.message,
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("servicePrice", false)));
  };
}

export function ActionValidateProvider(params, header, extraParams) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("validateProvider", true));

    USERAPI.validateProvider(params, header)
      .then((res) => {
        dispatch(ActionUserUpdate("validateProvider", res));
        dispatch(ActionGetUsers(extraParams, header));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("validateProvider", false)));
  };
}

// export function ActionAddComment(params, header) {
//   return (dispatch) => {
//     dispatch(ActionLoadingUpdate("addComment", true));
//     USERAPI.addComment(params, header)
//       .then((res) => {
//         dispatch(ActionUserUpdate("addComment", res));
//         dispatch(ActionGetFeedbacks(params, header));
//       })
//       .catch((err) => console.log(err))
//       .finally(() => dispatch(ActionLoadingUpdate("addComment", false)));
//   };
// }

export function ActionAddRating(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("addRating", true));
    USERAPI.addRating(params, header)
      .then((res) => {
        dispatch(ActionUserUpdate("addRating", res));
        dispatch(ActionGetFeedbacks(params, header));
        const pr = {
          userId: params.memberId,
          providerId: params.providerId,
        };
        dispatch(ActionGetProviderDetails(pr, header))
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("addRating", false)));
  };
}

export function ActionUpdateNotification(params, header, extraParams) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("updateNotificaton", true));

    USERAPI.updateNotification(params, header)
      .then((res) => {
        dispatch(ActionUserUpdate("updateNotificaton", res));
        if (res.success) {
          if (params.action === "UPDATE") {
            openAntdNotification({
              type: "success",
              title: "Successfully Updated",
              message: "You have read selected notification",
            });
            dispatch(ActionRouteNavigate(ROUTES.JOBS, { headerName: "All Jobs" }))
          }
          if (params.action === "DELETE")
            openAntdNotification({
              type: "success",
              title: "Successfully Deleted",
              message: res.message,
            });
          dispatch(ActionGetNotification(extraParams, header));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(ActionLoadingUpdate("updateNotificaton", false)));
  };
}

export function ActionUpdateProviderProfile(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("updateProviderProfile", true));
    USERAPI.updateProviderProfile(params, header)
      .then((res) => {
        if (res.success) {
          if (params.avatar !== "") {
            localStorage.setItem("USER_PROFILE_PIC", params.avatar);
          }
          dispatch(ActionUserUpdate("updateProviderProfile", res));
          openAntdNotification({
            type: "success",
            title: "Successfully Updated",
            message: res.message,
          });
        }
        if (!res.success) {
          openAntdNotification({
            type: "error",
            title: "Something went wrong",
            message: res.message,
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() =>
        dispatch(ActionLoadingUpdate("updateProviderProfile", false))
      );
  };
}

export function ActionUpdateOrgenizationProfile(params, header) {
  return (dispatch) => {
    dispatch(ActionLoadingUpdate("updateOrgenizationProfile", true));
    USERAPI.updateOrgenizatinonProfile(params, header)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("USER_PROFILE_PIC", params.avatar);
          dispatch(ActionUserUpdate("updateOrgenizationProfile", res));
          openAntdNotification({
            type: "success",
            title: "Successfully Updated",
            message: res.message,
          });
        }
        if (!res.success) {
          openAntdNotification({
            type: "error",
            title: "Something went wrong",
            message: res.message,
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() =>
        dispatch(ActionLoadingUpdate("updateOrgenizationProfile", false))
      );
  };
}
