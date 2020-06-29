import _ from 'lodash';
import moment from 'moment';
import {config} from '../configs';
import StorageApi from '../api/storage';
import {
  STORAGE_LOCAL_NAMESPACE,
  STORAGE_SERVER_DATA_NAMESPACE,
  STORAGE_USER_NAMESPACE,
  STORAGE_SESSION_NAMESPACE,
} from '../constants';
import {STORAGE_TYPES} from '../constants/enums';

function parsePersistedData(data) {
  let storeData = data;

  if (!storeData || !storeData.length) {
    return storeData;
  }

  try {
    if (typeof storeData === 'string') {
      storeData = JSON.parse(storeData);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return storeData;
}

function readPersistedData(ns, getStorageType = false) {
  const storeData = StorageApi.get(ns, getStorageType);

  if (getStorageType) {
    if (!storeData.data) {
      return storeData;
    }
    storeData.data = parsePersistedData(storeData.data);
    return storeData;
  }

  return parsePersistedData(storeData);
}

function persistData(data, ns, storageType = null) {
  const persisted = readPersistedData(ns, true);
  StorageApi.delete(ns);

  const store = (_.isNull(storageType) && persisted.storage)
    ? persisted.storage
    : (StorageApi[storageType] || StorageApi.session);

  let persistedData = (persisted.data) ? persisted.data : {};
  persistedData = _.extend(persistedData, data);

  return store.set(ns, persistedData);
}

export function persistSessionData(data, isLocalStorage = false) {
  return persistData(data, STORAGE_SESSION_NAMESPACE, isLocalStorage ? STORAGE_TYPES.SESSION : null);
}

export function readSessionData(getStorageType = false) {
  return readPersistedData(STORAGE_SESSION_NAMESPACE, getStorageType);
}

export function persistLocalData(data, isLocalStorage = false) {
  return persistData(data, STORAGE_LOCAL_NAMESPACE, isLocalStorage ? STORAGE_TYPES.LOCAL : null);
}

export function readLocalData(getStorageType = false) {
  return readPersistedData(STORAGE_LOCAL_NAMESPACE, getStorageType);
}

export function persistUserData(data, isLocalStorage = false) {
  return persistData(data, STORAGE_USER_NAMESPACE, isLocalStorage ? STORAGE_TYPES.LOCAL : null);
}

export function readUserData(getStorageType = false) {
  return readPersistedData(STORAGE_USER_NAMESPACE, getStorageType);
}

export function dropPersistedData(namespace) {
  return StorageApi.delete(namespace);
}

export function cacheData(key, data) {
  if (!key || !key.length) {
  }

  let ns = STORAGE_SERVER_DATA_NAMESPACE,
    persistedData = readPersistedData(ns) || {};

  persistedData[key] = {
    expireDate: moment().add(config.CACHE_LIFETIME.duration, config.CACHE_LIFETIME.units),
    data,
  };

  StorageApi.local.delete(ns);
  return StorageApi.local.set(ns, persistedData);
}

export function readCachedData() {
  const persistedData = readPersistedData(STORAGE_SERVER_DATA_NAMESPACE);
  const result = {};

  if (!persistedData || !_.isObject(persistedData)) {
    return result;
  }

  _.each(persistedData, (cache, key) => {
    if (!cache.expireDate || !moment().isBefore(cache.expireDate)) {
      return;
    }
    result[key] = cache.data;
  });
  return result;
}
