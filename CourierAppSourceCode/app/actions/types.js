/*===================================
=	Application action types		=
=====================================*/

/* --------- Auth Types ------------ */
export const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGIN_SUCCESS='LOGIN_SUCCESS';
export const VERIFY_SUCCESS='VERIFY_SUCCESS';
export const USER_LOGGED_OUT='USER_LOGGED_OUT';
export const USER_OBJECT_RECEIVED='USER_OBJECT_RECEIVED';
export const CLEAN_ALL='CLEAN_ALL';
export const USER_REFERRAL_SUBMITTED='USER_REFERRAL_SUBMITTED';
/* --------- End of Auth Types ------------ */

/* --------- Background Geolocation Types ------------ */
export const CHANGE_STATUS='CHANGE_STATUS';
export const LAST_POSITION='LAST_POSITION';
export const NETWORK_CONNECTED='NETWORK_CONNECTED';
export const NETWORK_DISCONNECTED='NETWORK_DISCONNECTED';
export const LOCATION_PROVIDER_CHANGE='LOCATION_PROVIDER_CHANGE';
export const CURRENT_ADDRESS_FETCHED='CURRENT_ADDRESS_FETCHED';
/* --------- End of Background Geolocation Types ------------ */

/* --------- Order Types ------------ */
export const ORDER_OBJECT='ORDER_OBJECT';
export const ACCEPT_ORDER='ACCEPT_ORDER';
export const ORDER_OBJECT_RECEIVED='ORDER_OBJECT_RECEIVED';
export const ACTIVE_ORDER_FETCHED='ACTIVE_ORDER_FETCHED';
export const ORDER_CANCELLED='ORDER_CANCELLED';
export const ORDER_SIGNED_BY='ORDER_SIGNED_BY';
export const ORDER_FINISHED='ORDER_FINISHED';
/* --------- End of Order Types ------------ */

/* --------- Broadcasting Types ------------ */
export const SENT_EX='SENT_EX';
/* --------- End of Broadcasting Types ------------ */

/* --------- Connectivity Types ------------ */
export const USER_BANNED='USER_BANNED';
export const USER_PAUSED='USER_PAUSED';
export const USER_UNBANNED='USER_UNBANNED';
export const USER_UNPAUSED='USER_UNPAUSED';
/* --------- End of Connectivity Types ------------ */

/* --------- Loading Types ------------ */
export const LOADING='LOADING';
/* --------- End of Loading Types ------------ */

/* --------- Transactions Types ------------ */
export const TRANSACTION_FETCHED='TRANSACTION_FETCHED';
export const SUMMARY_FETCHED='SUMMARY_FETCHED';
export const POSITION_SUMMARY_FETCHED='POSITION_SUMMARY_FETCHED';
/* --------- End of Transactions Types ------------ */

/* --------- History Types ------------ */
export const HISTORY_FETCHED='HISTORY_FETCHED';
export const SINGLE_HISTORY_FETCHED='SINGLE_HISTORY_FETCHED';
/* --------- End of History Types ------------ */

/* --------- User Types ------------ */
export const UPDATE_CREDIT='UPDATE_CREDIT';
/* --------- End of User Types ------------ */

/* --------- Leaderboard Types ------------ */
export const LEADERBOARD_FETCHED='LEADERBOARD_FETCHED';
export const USER_LEADERBOARD_FETCHED='USER_LEADERBOARD_FETCHED';
/* --------- End of Leaderboard Types ------------ */

/* --------- User Account Types ------------ */
export const BANKS_LIST_FETCHED='BANKS_LIST_FETCHED';
export const USER_ACCOUNT_FETCHED='USER_ACCOUNT_FETCHED';
export const USER_ACCOUNT_SAVED='USER_ACCOUNT_SAVED';
/* --------- End of User Account Types ------------ */

/* --------- Heatmap Types ------------ */
export const HEATMAP_DATA_FETCHED='HEATMAP_DATA_FETCHED';
/* --------- End of Heatmap Types ------------ */

/* --------- Score Types ------------ */
export const SCORE_DETAILS_FETCHED='SCORE_DETAILS_FETCHED';
/* --------- End of Score Types ------------ */

