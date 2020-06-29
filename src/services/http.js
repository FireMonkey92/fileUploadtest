/* globals fetch */

import 'isomorphic-fetch';
import $q from 'q';
import _ from 'lodash';
import { UtilsHelper } from 'utils/utils-helper';
import ResponseManager from './responseManager';

class http {
    static DEFAULT_HEADERS = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
    };

    static _prepareBody(body) {
        return _.isObject(body) ? JSON.stringify(body) : body;
    }

    static _prepareHeaders(headers, useDefaultHeaders = true) {
        let buildHeaders = useDefaultHeaders ? http.DEFAULT_HEADERS : {};

        if (!_.isEmpty(http.request.HEADERS)) {
            buildHeaders = { ...buildHeaders, ...http.request.HEADERS };
        }

        if (!headers || !_.isObject(headers)) {
            return buildHeaders;
        }

        return { ...buildHeaders, ...headers };
    }

    static _requestBuilder(methodType, url, body, headers = {}, isNoCors = false) {

        let deferred = $q.defer();
        let params = {
            method: methodType,
            headers: http._prepareHeaders(headers),
            body: http._prepareBody(body)
            // , credentials: 'include'
        };
        if (isNoCors) {
            params.mode = 'no-cors';
        }

        fetch(url, params)
            .then(function (res) {
                return response.parse(res);
            })
            .then(function (json) {
                deferred.resolve(json);
            }).catch(function (ex) {
                deferred.reject(ex);
            });

        return deferred.promise;
    }

    static post(url, body, headers = {}, isNoCors = false) {
        return http._requestBuilder('POST', url, body, headers, isNoCors)
    }

    static req(methodType, url, body, headers = {}, isNoCors = false) {
        let deferred = $q.defer();
        let params = {
            method: methodType,
            headers: http._prepareHeaders(headers, false),
            body: http._prepareBody(body),
        };

        if (isNoCors) {
            params.mode = 'no-cors';
        }

        fetch(url, params)
            .then(function (res) {
                return response.parse(res);
            })
            .then(function (json) {
                deferred.resolve(json);
            }).catch(function (ex) {
                deferred.reject(ex);
            });

        return deferred.promise;
    }

    static put(url, body, headers = {}, isNoCors = false) {
        return http._requestBuilder('PUT', url, body, headers, isNoCors)
    }

    static get(url, headers = {}, isNoCors = false) {
        let deferred = $q.defer();
        let params = {
            headers: http._prepareHeaders(headers),
            // , credentials: 'include'
        };

        if (isNoCors) params.mode = 'no-cors';


        fetch(url, params)
            .then(function (res) {
                return response.parse(res);
            })
            .then(function (json) {
                deferred.resolve(json);
            })
            .catch(function (ex) {
                deferred.reject(ex);
            });

        return deferred.promise;
    }
}

class response {
    static parse(res, type = 'json') {
        ResponseManager.receive(res);
        switch (type) {
            case 'json':
                return res.json();
            case 'text':
            default:
                return res.text();
        }
    }

    static hasError(res) {
        return _.has(res, 'errorObj');
    }

}

class request {
    static buildUri(obj) {
        return '?' + UtilsHelper.serialize(obj);
    }

    static HEADERS = {};

    static setHeader(header) {
        request.HEADERS = { ...request.HEADERS, ...header };
        return request;
    }

    static removeHeader(headerKey) {
        if (_.has(request.HEADERS, headerKey)) {
            delete request.HEADERS[headerKey];
        }
        return request;
    }
}

http.response = response;
http.request = request;

export default http;