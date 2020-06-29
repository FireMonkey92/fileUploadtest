import http from "../services/http";
import $q from "q";
import _ from 'lodash'
import { config } from "../configs";

const { API_MAP, API_URL } = config;

const headerConfig = {
  "Access-Control-Allow-Origin": "*, *",
  "Content-Type": "application/json"
};

export default class USERAPI {
  static login(params) {
    const deferred = $q.defer();
    http
      .post(API_URL + API_MAP.LOGIN, params, headerConfig)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));
    return deferred.promise;
  }
  // API to get OTP
  static authenticateUser(params) {
    const deferred = $q.defer();
    http
      .post(API_URL + API_MAP.AUTHENTICATE, params, headerConfig)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }
  static varifyMobile(params) {
    const deferred = $q.defer();
    http
      .post(API_URL + API_MAP.VARIFYMOBILE, params, headerConfig)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static logout(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .post(API_URL + API_MAP.LOGOUT, params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static userSignup(params) {
    const deferred = $q.defer();
    const finalparam = {
      email: params.email,
      firstName: _.trim(params.fname),
      lastName: _.trim(params.lname),
      gender: params.gender,
      latitude: "",
      longitude: "",
      countryId: 1,
      stateId: 1,
      cityId: 1,
      role: 4,
      location: "",
      address: "",
      mobileNumber: params.mobile,
      dob: params.dateofbirth,
      // dob: params.year + "-" + params.month + "-" + params.date,
      base64ImageContent: params.avatar
    };
    http
      .post(API_URL + API_MAP.REGISTERUSER, finalparam, headerConfig)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static IndependentSignUp(params) {

    const deferred = $q.defer();
    const finalparam = {
      email: params.email,
      firstName: _.trim(params.fname),
      lastName: _.trim(params.lname),
      gender: "",
      latitude: "",
      longitude: "",
      countryId: params.country,
      stateId: params.state,
      cityId: params.city,
      role: 3,
      location: "",
      address: _.trim(params.address),
      mobileNumber: params.mobile,
      dob: params.dateofbirth,
      // dob: params.year + "-" + params.month + "-" + params.date,
      base64ImageContent: params.avatar,
      experience: params.workyears,
      timings: {},
      primaryIdentity: 2,
      primaryIdentityValue: params.pan,
      secondaryIdentity: 4,
      secondaryIdentityValue: params.aadhaar,
      qualificationId: params.education,
      description: _.trim(params.about),
      base64DocumentContent: params.certificate.base64url,
      documentName: "degree",
      services: params.services
    };
    console.log(finalparam)
    http
      .post(API_URL + API_MAP.REGISTERPROVIDER, finalparam)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static OrgainsationSignUp(params) {
    const deferred = $q.defer();
    const finalparam = {
      email: params.oemail,
      organization: _.trim(params.oname),
      countryId: params.country,
      stateId: params.state,
      cityId: params.city,
      role: 5,
      location: "",
      address: params.address,
      oraganizationPhoneNumber: params.telephone,
      base64ImageContent: params.avatar,
      communicator: _.trim(params.cname),
      communicatorPhoneNumber: params.phone,
      primaryIdentity: 1,
      primaryIdentityValue: params.gst,
      secondaryIdentity: 3,
      secondaryIdentityValue: params.tan,
      startedYear: params.startyear,
      totalMembers: params.totalmember,
      services: params.services,
      description: _.trim(params.about)
    };

    http
      .post(API_URL + API_MAP.REGISTERORGANIZATION, finalparam)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static getUserDetails(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .get(API_URL + API_MAP.USERDETAILS + params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }



  static varifyEmail(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .get(API_URL + API_MAP.VARIFYEMAIL + params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static addFav(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .post(API_URL + API_MAP.ADDFAV, params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static createJob(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .post(API_URL + API_MAP.CREATEJOB, params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static changeJobStatus(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .post(API_URL + API_MAP.CHANGEJOBSTATUS, params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static bankDetails(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .post(API_URL + API_MAP.BANKDETAILS, params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static uploadFile(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .post(API_URL + API_MAP.UPLOADFILE, params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static updateServicePrice(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .post(API_URL + API_MAP.UPDATESERVICESPRICE, params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static validateProvider(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .post(API_URL + API_MAP.VALIDATEPROVIDER, params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static addComment(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .post(API_URL + API_MAP.ADDCOMMENT, params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }
  static addRating(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };
    http
      .post(API_URL + API_MAP.ADDRATING, params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));
    return deferred.promise;
  }

  static updateNotification(params, header) {
    const deferred = $q.defer();

    const headers = {
      ...headerConfig,
      ...header
    };

    http
      .post(API_URL + API_MAP.UPDATENOTIFICATION, params, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static updateProviderProfile(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };

    const finalparam = {
      id: params.id,
      firstName: _.trim(params.fname),
      lastName: _.trim(params.lname),
      countryId: params.country,
      stateId: params.state,
      cityId: params.city,
      gender: "",
      location: "",
      address: _.trim(params.address),
      base64ImageContent: params.avatar !== null ? _.includes(params.avatar, "https://")
        ? ""
        : params.avatar : "",
      description: _.trim(params.about),
      experience: params.workyears,
      qualificationId: params.education,
      servicePrices: []
    };

    http
      .post(API_URL + API_MAP.UPDATEPROVIDERPROFILE, finalparam, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  static updateOrgenizatinonProfile(params, header) {
    const deferred = $q.defer();
    const headers = {
      ...headerConfig,
      ...header
    };

    const finalparam = {
      id: params.id,
      firstName: _.trim(params.oname),
      countryId: params.country,
      stateId: params.state,
      cityId: params.city,
      // dob: "",
      // gender: "",
      location: "",
      address: params.address,
      base64ImageContent: params.avatar !== null ? _.includes(params.avatar, "https://")
        ? ""
        : params.avatar : "",
      communicator: _.trim(params.cname),
      communicatorPhoneNumber: params.phone,
      startedYear: params.startyear,
      totalMembers: params.totalmember,
      description: _.trim(params.about),
      servicePrices: []
    };

    http
      .post(API_URL + API_MAP.UPDATEPROVIDERPROFILE, finalparam, headers)
      .then(res => deferred.resolve(res))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }
}
