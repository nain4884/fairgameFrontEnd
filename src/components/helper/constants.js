module.exports = {
  // apiBasePath: "http://159.65.154.97:3100/", // server url
  // apiBasePath: "http://159.65.154.97:3300/", // server url
  // apiBasePath: "http://139.59.88.49:3100/", // server url
  apiBasePath: "https://3100dev.fairgame.club/",

  // apiMicroBasePath: "http://localhost:3200", // server url
  apiMicroBasePath: "https://3100dev.fairgame.club",
  // microServiceApiPath: "http://139.59.88.49:3200",
  microServiceApiPath: "https://3200dev.fairgame.club",
  // imageBasePath: "http://localhost:4000/public/images/", /// server image base pathpath

  // thirdPartyAPIBasePath: "http://3.23.22.210:4001/api/", // third party api url

  //---------------------------------------User Roles--------------------------------------------------\\

  SuperAdmin: 1,
  Expert: 2,
  Admin: 3,
  SuperMaster: 4,
  Master: 5,
  User: 6,

  //----------------------------------------Match Types------------------------------------------------\\

  MatchType: 1,
  SessionType: 2,
  TestType: 3,

  //---------------------------------------Button Types-------------------------------------------------\\

  Save: 1,
  Launch: 2,
  Close: 3,

  // --------------------------------------Session Bets Type -------------------------------------------------//

  Manual: 1,
  Fancy: 2,

  SessionTimerLOGOUT: 24 * 60 * 60 * 1000,
  SessionTimerWARN: 23 * 60 * 60 * 1000,

  // --------------------------------------ErrorMessages -------------------------------------------------//

  LoginServerError:
    "Sorry, we were unable to process your login request at this time due to a server configuration error. Please try again later or contact our support team for assistance.",

  // -------React Captcha--------//

  REACT_APP_SECRET_KEY: "6Lc7BsAiAAAAAA6gDOpiBsb8fybpUYfS8_qLY9NS",
  REACT_APP_SITE_KEY: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",

  // ----------- Matches ---------- //

  matchType: [
    "cricket",
    "tennis",
    "football",
    "ice",
    "hockey",
    "volleyball",
    "politics",
    "basketball",
    "table_tennis",
    "darts",
  ],
  defaultMarketId: 4312,

  pageLimit: 10,
  pageCount: 10,
  listOfClientCountLimit: 15,

  // customPageLimit: 10,
  // customTimeOut: 300000,// 5 mint in mili seconds user ideal 5 mint after that logout
  // customTimer: 30000,// 30 sec in mili seconds remainint timer start and show message  Your session will expire in 30 second
  // sessionExpireTime: 30 // 30 sec,

  customPageLimit: 15,
  customTimeOut: 1000 * 60 * 60,// 5 mint in mili seconds user ideal 5 mint after that logout
  customTimer: 1000 * 60 * 5,// 30 sec in mili seconds remainint timer start and show message  Your session will expire in 30 second
  sessionExpireTime: 60 * 5 // 30 sec,
};
