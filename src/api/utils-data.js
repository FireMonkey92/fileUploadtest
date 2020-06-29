import http from "../services/http"
import $q from "q";
import { config } from "../configs";

const { API_MAP, API_URL } = config;

const headerConfig = {
    'Access-Control-Allow-Origin': "*, *",
    'Content-Type': 'application/json',
}

export default class UtilsData {

    static getCountry(params) {
        const deferred = $q.defer();
        let url = "?";
        if (params !== undefined)
            url += params.status !== undefined ? "status=" + params.status : "";
        // console.log(API_URL + API_MAP.GETCOUNTRY + url)
        http.get(API_URL + API_MAP.GETCOUNTRY + url)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getState(params) {
        const deferred = $q.defer();
        let url = "?"
        const { status, countryId } = params;
        if (status) {
            url += 'status=' + status
            if (countryId) {
                url += '&countryId=' + countryId;
            }
        }
        else {
            url += '&countryId=' + countryId;
        }
        http.get(API_URL + API_MAP.GETSTATE + url)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getCity(params) {
        const deferred = $q.defer();
        let url = "?"
        '?stateId='
        const { status, stateId } = params;
        if (status) {
            url += 'status=' + status
            if (stateId) {
                url += '&stateId=' + stateId;
            }
        }
        else {
            url += '&stateId=' + stateId;
        }


        http.get(API_URL + API_MAP.GETCITY + url)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getServices(params) {

        const deferred = $q.defer();
        let url = "?";
        if (params !== undefined)
            url += params.status !== undefined ? "status=" + params.status : "";
        // console.log(API_URL + API_MAP.GETSERVICES + url)
        http.get(API_URL + API_MAP.GETSERVICES + url)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getQualification(params) {
        const deferred = $q.defer();
        let url = "?";
        if (params !== undefined)
            url += params.status !== undefined ? "status=" + params.status : "";
        http.get(API_URL + API_MAP.QUALIFICATIONS + url)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static updateQualification(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        http.post(API_URL + API_MAP.UPDATE_QUALIFICATION, params, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static updateService(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        http.post(API_URL + API_MAP.UPDATE_SERVICE, params, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }

    static getBank() {
        const deferred = $q.defer();
        http.get(API_URL + API_MAP.GETBANK)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))

        return deferred.promise;
    }


    static getAllStateList() {
        const deferred = $q.defer();
        http.get(API_URL + API_MAP.GETALLSTATE)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))
        return deferred.promise;
    }
    static getAllCitiesList() {
        const deferred = $q.defer();
        http.get(API_URL + API_MAP.GETALLCITIES)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))
        return deferred.promise;
    }


    static updateState(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        http.post(API_URL + API_MAP.ADDUPDATESTATE, params, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))
        return deferred.promise;
    }

    static updateCity(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        http.post(API_URL + API_MAP.ADDUPDATECITY, params, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))
        return deferred.promise;
    }



    static getAllJobordersForAdmin(params, header) {
        const deferred = $q.defer();
        const headers = {
            ...headerConfig,
            ...header
        }
        const { userId, pgSkip, pgLimit, sortBy, sortByFlag } = params;
        var url = userId ? `?userId=${params.userId}` : "";
        pgSkip != undefined ? url += '&pgSkip=' + pgSkip : '';
        pgLimit != undefined ? url += '&pgLimit=' + pgLimit : '';
        sortBy != undefined ? url += '&sortBy=' + sortBy : '';
        sortByFlag != undefined ? url += '&sortByFlag=' + sortByFlag : '';

        http.get(API_URL + API_MAP.ALLJOBSFORADMIN + url, headers)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))
        return deferred.promise;
    }

    static getPriceConstants() {
        const deferred = $q.defer();

        http.get(API_URL + API_MAP.GETPRICECONSTANTS)
            .then(res => deferred.resolve(res))
            .catch(err => deferred.reject(err))
        return deferred.promise;
    }
}