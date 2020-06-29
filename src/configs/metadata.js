// import {URL_MAP} from '../constants/urls';
// import ROUTES from './routes';
// import {APP_NAME} from './app';

// const METADATA = {};
// const trimSlashes = url => url && url.replace(/^\/|\/$/g, '');
// const getMetadata = (url = '', metadata = {}) => {
//   const urlTrimmed = trimSlashes(url);
//   const metadataKeys = urlTrimmed && METADATA[urlTrimmed] ? METADATA[urlTrimmed] : metadata;

//   return {
//     title: `${t(metadataKeys.titleKey)}`,
//     description: t(metadataKeys.descriptionKey),
//   };
// };

// METADATA[trimSlashes(ROUTES.LOADING)] = {
//   titleKey: 'metadata.loadingPage.title',
//   descriptionKey: 'metadata.loadingPage.description',
// };

// METADATA[trimSlashes(ROUTES.LINES)] = {
//   titleKey: 'metadata.linesPage.title',
//   descriptionKey: 'metadata.linesPage.description',
// };

// // METADATA[trimSlashes(ROUTES.VIEW_LINE)] = {
// //   titleKey: 'metadata.viewLinePage.title',
// //   descriptionKey: 'metadata.viewLinePage.description',
// // };

// METADATA[trimSlashes(URL_MAP.VIEW_MODULE)] = {
//   titleKey: 'metadata.viewModulePage.title',
//   descriptionKey: 'metadata.viewModulePage.description',
// };

// METADATA[trimSlashes(ROUTES.OPERATION_DETAILS)] = {
//   titleKey: 'metadata.operationDetailsPage.title',
//   descriptionKey: 'metadata.operationDetailsPage.description',
// };

// METADATA[trimSlashes(ROUTES.VEHICLE_DETAILS)] = {
//   titleKey: 'metadata.vehicleDetailsPage.title',
//   descriptionKey: 'metadata.vehicleDetailsPage.description',
// };

// export default METADATA;

// export {getMetadata};
