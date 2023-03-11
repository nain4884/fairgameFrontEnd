module.exports = {

	'apiBasePath': 'http://localhost:4000', // server url
	'imageBasePath': 'http://localhost:4000/public/images/', /// server image base path

	anupamBasePath: "https://fa30-117-197-24-47.in.ngrok.io",

	//   'apiBasePath': 'http://18.169.59.243:4000', // server url
	//   'imageBasePath': 'http://18.169.59.243:4000/public/images/' , /// server image base path


	'thirdPartyAPIBasePath': 'http://3.23.22.210:4001/api/',   // third party api url


	//---------------------------------------User Roles--------------------------------------------------\\

	'SuperAdmin': 1,
	'Expert': 2,
	'Admin': 3,
	'SuperMaster': 4,
	'Master': 5,
	'User': 6,

	//----------------------------------------Match Types------------------------------------------------\\

	'MatchType': 1,
	'SessionType': 2,
	'TestType': 3,

	//---------------------------------------Button Types-------------------------------------------------\\

	'Save': 1,
	'Launch': 2,
	'Close': 3,
	
	// --------------------------------------Session Bets Type -------------------------------------------------//

	'Manual': 1,
	'Fancy': 2,

	SessionTimerLOGOUT: 24 * 60 * 60 * 1000,
	SessionTimerWARN: 23 * 60 * 60 * 1000,

	// --------------------------------------ErrorMessages -------------------------------------------------//

	LoginServerError: "Sorry, we were unable to process your login request at this time due to a server configuration error. Please try again later or contact our support team for assistance.",


	// -------React Captcha--------//
	
	REACT_APP_SECRET_KEY :"6Lc7BsAiAAAAAA6gDOpiBsb8fybpUYfS8_qLY9NS",
	REACT_APP_SITE_KEY :"6Lc7BsAiAAAAAEymVuF8kjJeoqPFSSgkxI3Euhve"
}