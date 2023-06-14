/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "fr",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		// {
		//	module: "updatenotification",
		//	position: "top_bar"
		//}, 
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: true,
				locationID: "3026700", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "c0526873bd2aaf4e98ead041cf09c76c",
				lang: "fr"
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: true,
				locationID: "3026700", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "c0526873bd2aaf4e98ead041cf09c76c",
				lang: "fr"
			}
		},
		// {
		// 	module: "newsfeed",
		// 	position: "bottom_bar",
		// 	config: {
		// 		feeds: [
		// 			{
		// 				title: "Actualités",
		// 				url: "https://www.lemonde.fr/rss/une.xml"
		// 			}
		// 		],
		// 		showSourceTitle: true,
		// 		showPublishDate: true,
		// 		broadcastNewsFeeds: true,
		// 		updateInterval: 300000,
		// 		animationSpeed: 2500,
		// 		maxNewsItems: 5,
		// 		ignoreOldItems: true,
		// 		ignoreOlderThan: 24 * 60 * 60 * 1000,
		// 		wrapTitle: true,
		// 		wrapDescription: true,
		// 		truncateDescription: true,
		// 		lengthDescription: 150,
		// 		reloadInterval: 60 * 60 * 1000
		// 	}
		// },
		{
			module: "MMM-Breathwork",
			position: "bottom_right",
		},
		// {
		// 	module: 'MMM-RATP',
		// 	position: 'top_left',
		// 	config: {
		// 		theme: 'dashboard',
		// 		timetables: {
		// 			config: [
		// 				{ type: 'metro', line: '8', station: 'Boucicaut', direction: 'Creteil' },
		// 			]
		// 		},
		// 		traffic: {
		// 			config: [
		// 				{ type: 'metro', line: '8' }
		// 			]
		// 		}
		// 	}
		// },
		// {
		// module: "MMM-OnSpotify",
		// 	position: "lower_third",
		// 	config: {
		// 		// Spotify authentication (Authentication Service / Migration from MMM-NowPlayingOnSpotify)
		// 		clientID: "28c9f83ae2cf4f0ebb049ad1ac7c6269",
		// 		clientSecret: "42465888daf3461eb1ef92e3ad2b778b",
		// 		accessToken: "BQBoQSlWLKcjXMSGpvbmc2vwhV9-kKj_yhYpy2YVnDVUq-N3EQ-u3cUpAKpIGteTRDhILC93qjItLpO34HncE29d-_pKvdvumruo5Ewxx1AUVivkSYAq_SmYpa4BwogZbm2NaBdY750yxs8yFxmzUGwzAY-20Ffp-EPVpaUFAXhcMCrqKAqbo7I4MHxITF8zqsOqnSbCMsN3AvM",
		// 		refreshToken: "AQA_tI6tMBq60iZ1UsdyCXRnJSRTl6a5snTFy6TCfCf25adw46xfLVaG2Xq4f6TX2Pv5IkHcQmTO13skPRLsBtvnbG2O6bHVFPxcHh7HQu948eNWMzlx-W9dD7nVJLULjro",

		// 			// General module options [SEE BELOW]
		// 			advertisePlayerTheme: true,
		// 			displayWhenEmpty: "both",
		// 			userAffinityUseTracks: false,
		// 			prefersLargeImageSize: false,
		// 			hideTrackLenghtAndAnimateProgress: false,
		// 			showDebugPalette: true,
		// 			userDataMaxAge: 14400,
		// 			userAffinityMaxAge: 36000,
		 
		// 			// Update intervals [SEE BELOW]
		// 			isPlaying: 1,
		// 			isEmpty: 2,
		// 			isPlayingHidden: 2,
		// 			isEmptyHidden: 4,
		// 			onReconnecting: 4,
		// 			onError: 8,
		 
		// 			// Animations [SEE BELOW]
		// 			mediaAnimations: false,
		// 			fadeAnimations: false,
		// 			transitionAnimations: true,
		 
		// 			// Spotify Code (EXPERMIENTAL)
		// 			spotifyCodeExperimentalShow: true,
		// 			spotifyCodeExperimentalUseColor: true,
		// 			spotifyCodeExperimentalSeparateItem: true,
		 
		// 			// Theming General
		// 			roundMediaCorners: true,
		// 			roundProgressBar: true,
		// 			useColorInProgressBar: true,
		// 			useColorInTitle: true,
		// 			useColorInUserData: true,
		// 			showBlurBackground: true,
		// 			blurCorrectionInFrameSide: true,
		// 			blurCorrectionInAllSides: true,
		// 			alwaysUseDefaultDeviceIcon: true,
		// 			},
		// },
		{
		module: "MMM-Tda",
		position: 'bottom_left'
		},
		{
		module : "MMM-MedicationReminder",
		position: 'top_left',
		config: {
			header : false,
		  }
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
