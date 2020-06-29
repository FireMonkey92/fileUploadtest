import http from "../services/http"
import $q from "q";
import { config } from "../configs";

const { API_MAP, API_URL, TALKJS_USER_URL, TALKJS_AUTHORIZATION } = config;
const headerConfig = {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'application/json',
}


export default class ServerData {

    static getAllProviders(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        const { userId, pgSkip, pgLimit, sortBy, sortByFlag, cityId, qualificationId, serviceId, providerType, favorite, name } = params;
        var url = userId ? `?userId=${params.userId}` : "";
        pgSkip != undefined ? url += '&pgSkip=' + pgSkip : '';
        pgLimit != undefined ? url += '&pgLimit=' + pgLimit : '';
        sortBy != undefined ? url += '&sortBy=' + sortBy : '';
        sortByFlag != undefined ? url += '&sortByFlag=' + sortByFlag : '';
        cityId != undefined ? url += '&cityId=' + cityId : '';
        qualificationId != undefined ? url += '&qualificationId=' + qualificationId : '';
        serviceId != undefined ? url += '&serviceId=' + serviceId : '';
        providerType != undefined ? url += '&providerType=' + providerType : '';
        favorite != undefined ? url += '&favorite=' + favorite : '';
        name != undefined ? url += '&name=' + name : '';

        http.get(API_URL + API_MAP.GETALLPROVIDERS + url, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getProviderDetails(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        const { userId, providerId } = params;
        var url = userId ? `?userId=${params.userId}` : "";
        providerId != undefined ? url += '&providerId=' + providerId : '';
        http.get(API_URL + API_MAP.GETPROVIDERDETAILS + url, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getAllFavoriates(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        const { userId, pgSkip, pgLimit, sortBy, sortByFlag, cityId, qualificationId, serviceId, providerType, favorite, name } = params;
        var url = userId ? `?userId=${params.userId}` : "";
        pgSkip != undefined ? url += '&pgSkip=' + pgSkip : '';
        pgLimit != undefined ? url += '&pgLimit=' + pgLimit : '';
        sortBy != undefined ? url += '&sortBy=' + sortBy : '';
        sortByFlag != undefined ? url += '&sortByFlag=' + sortByFlag : '';
        cityId != undefined ? url += '&cityId=' + cityId : '';
        qualificationId != undefined ? url += '&qualificationId=' + qualificationId : '';
        serviceId != undefined ? url += '&serviceId=' + serviceId : '';
        providerType != undefined ? url += '&providerType=' + providerType : '';
        favorite != undefined ? url += '&favorite=' + favorite : '';
        name != undefined ? url += '&name=' + name : '';

        http.get(API_URL + API_MAP.GETALLPROVIDERS + url, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }


    static getJobList(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        const { userId, pgSkip, pgLimit, sortBy, sortByFlag } = params;
        var url = userId ? `?userId=${params.userId}` : "";
        pgSkip != undefined ? url += '&pgSkip=' + pgSkip : '';
        pgLimit != undefined ? url += '&pgLimit=' + pgLimit : '';
        sortBy != undefined ? url += '&sortBy=' + sortBy : '&sortBy=jobId';
        sortByFlag != undefined ? url += '&sortByFlag=' + sortByFlag : '&sortByFlag=1';

        http.get(API_URL + API_MAP.JOBLIST + url, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getJobDetails(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        const { userId, jobId } = params;
        var url = userId ? `?userId=${params.userId}` : "";
        jobId != undefined ? url += '&jobId=' + jobId : '';
        http.get(API_URL + API_MAP.JOBDETAILS + url, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getServiceByProvider(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        http.get(API_URL + API_MAP.SERVICEBYPROVIDER + params, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getProviderDashboardDetails(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        http.get(API_URL + API_MAP.PROVIDERDASHBOARD + params, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getBankDetails(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        http.get(API_URL + API_MAP.GETBANKDETAILS + params, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getTalkJSUsers(userId) {
        const deferred = $q.defer();
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TALKJS_AUTHORIZATION}`
        }
        http.get(TALKJS_USER_URL + userId, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getUsers(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        let updateParams = `?`;
        updateParams += params.userType !== undefined ? 'userType=' + params.userType : "";
        updateParams += params.pgSkip !== undefined ? '&pgSkip=' + params.pgSkip : "";
        updateParams += params.pgLimit !== undefined ? '&pgLimit=' + params.pgLimit : "";
        updateParams += params.userName !== undefined ? '&userName=' + params.userName : "";
        updateParams += params.sortBy !== undefined ? '&sortBy=' + params.sortBy : "";
        updateParams += params.sortByFlag !== undefined ? '&sortByFlag=' + params.sortByFlag : "";

        http.get(API_URL + API_MAP.GETUSERS + updateParams, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getNotification(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        let url = "?";
        url += params.userId !== undefined ? "userId=" + params.userId : "";
        url += params.viewStatus !== undefined ? "&viewStatus=" + params.viewStatus : "";

        http.get(API_URL + API_MAP.GETNOTIFICATION + url, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getUserFeedBacks(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }

        let url = "?";
        url += params.providerId !== undefined ? "providerId=" + params.providerId : "";
        // url += params.memberId !== undefined ? "&memberId=" + params.memberId : "";

        http.get(API_URL + API_MAP.GETFEEDBACKS + url, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

}

