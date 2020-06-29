/* globals localStorage sessionStorage */

import Cookie from 'js-cookie';
import _ from 'lodash';

export class localStorageApi {
  static storageName = 'localStorage';

  static set(key, value) {
    if (_.isObject(value)) {
      value = JSON.stringify(value);
    }

    localStorage[key] = value;

    return localStorage[key];
  }

  static get(key, defaultValue) {
    return localStorage[key] || defaultValue;
  }

  static setObject(key, value) {
    localStorage[key] = JSON.stringify(value);

    return localStorage[key];
  }

  static getObject(key, defaultValue = '{}') {
    return JSON.parse(localStorage[key] || defaultValue);
  }

  static clear() {
    return localStorage.clear();
  }

  static delete(key) {
    return localStorage.removeItem(key);
  }

}

export class sessionStorageApi {
  static storageName = 'sessionStorage';

  static set(key, value) {
    if (_.isObject(value)) {
      value = JSON.stringify(value);
    }

    sessionStorage[key] = value;

    return sessionStorage[key];
  };

  static get(key, defaultValue) {
    return sessionStorage[key] || defaultValue;
  }

  static setObject(key, value) {
    sessionStorage[key] = JSON.stringify(value);

    return sessionStorage[key];
  }

  static getObject(key, defaultValue = '{}') {
    return JSON.parse(sessionStorage[key] || defaultValue);
  }

  static clear() {
    return sessionStorage.clear();
  }

  static delete(key) {
    return sessionStorage.removeItem(key);
  }
}

export class CookieStorageApi {
  static storageName = 'cookieStorage';

  static set(key, value, expires, settings) {
    let options = {};

    if (!_.isUndefined(expires)) {
      options.expires = expires;
    }

    if (!_.isUndefined(settings)) {
      options = {...options, ...settings};
    }

    return Cookie.set(key, value, options);
  };

  static get(key, defaultValue) {
    return Cookie.get(key) || defaultValue;
  }

  static setObject(key, value, expires, settings) {
    return CookieStorageApi.set(key, value, expires, settings);
  }

  static getObject(key, defaultValue = {}) {
    return Cookie.getJSON(key) || defaultValue;
  }

  static delete(key, settings) {
    return Cookie.remove(key, settings);
  }
}

export default class StorageApi {
  static local = localStorageApi;

  static session = sessionStorageApi;

  static cookies = CookieStorageApi;

  static getStorageTypeByNamespace(key) {
    if (localStorageApi.get(key)) {
      return StorageApi.local;
    }

    if (sessionStorageApi.get(key)) {
      return StorageApi.session;
    }

    if (CookieStorageApi.get(key)) {
      return StorageApi.cookies;
    }

    return undefined;
  }

  static get(key, returnStorageType) {
    let data;
    let storage = null;

    if (data = localStorageApi.get(key)) {
      storage = StorageApi.local;
    } else if (data = sessionStorageApi.get(key)) {
      storage = StorageApi.session;
    } else if (data = CookieStorageApi.get(key)) {
      storage = StorageApi.cookies;
    }

    if (!returnStorageType) {
      return data;
    }

    return {data, storage};
  }

  static delete(key) {
    localStorageApi.delete(key);
    sessionStorageApi.delete(key);
    CookieStorageApi.delete(key);
  }

  static getStorageObjByKey(key) {
    if (localStorageApi.get(key)) {
      return localStorageApi;
    }

    if (sessionStorageApi.get(key)) {
      return sessionStorageApi;
    }

    if (CookieStorageApi.get(key)) {
      return CookieStorageApi;
    }

    return null;
  }
}
