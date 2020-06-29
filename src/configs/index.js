/* eslint-disable prefer-destructuring */
import ROUTES from './routes';
import METADATA from './metadata';
import API_MAP from './url-api';


export const API_URL = process.env.API_URL;

export const TALKJS_USER_URL = "https://api.talkjs.com/v1/tjoRjqYU/users/";
export const TALKJS_APPID = "tjoRjqYU"
export const TALKJS_AUTHORIZATION = "sk_test_dcvm9ifmJfmQjMSoulEhEmEy"
export const SITE_KEY = "6LeU8PkUAAAAAEaC31vgxmrvPvyLZMGglX8aJHtJ"

export const API_SETTINGS = {
  API_URL,
  TALKJS_USER_URL
};

export const config = {
  ROUTES,
  METADATA,
  API_SETTINGS,
  API_MAP,
  API_URL,
  TALKJS_USER_URL,
  TALKJS_APPID,
  TALKJS_AUTHORIZATION,
  SITE_KEY
};

export default function ConfigStorage() {
  return config;
}
