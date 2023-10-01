const config = require('../package.json').projectConfig;
const BACKEND_BASE_URL = config.backendApiBaseUrl;
const BACKEND_BASE_URL_IMG = config.backendApiBaseUrlImg;

const COUNTRY_FLAG = {
    BASE_URL: `https://flagsapi.com/`,
    SIZE: {16: '16', 24: '24', 32: '32', 48: '48', 64: '64'},
    STYLE: {FLAT: 'flat', SHINY: 'shiny'},
  };
const BACKEND_API = {
  BASE_API_URL: `${BACKEND_BASE_URL}`,
  GETORDERWAITING: '/orders/getorderwaiting',
  GETTINGORDER: '/orders/update_order_status/',
  GETORDERDELIVERING: '/orders/get-order-delivering/',
  GETORDERDETAIL: '/orders/get-order-detail/',

}  
const STATIC_IMAGE = {
  BASE_URL: `${BACKEND_BASE_URL_IMG}`,
  TYPE: {POSTER: 'poster', LOGO: 'logo', GALLERY: 'gallery'},
  SIZE: {SQUARE: 'square', LANDSCAPE: 'landscape', PORTRAIT: 'portrait'},
};
  
export default {COUNTRY_FLAG,BACKEND_API,STATIC_IMAGE};