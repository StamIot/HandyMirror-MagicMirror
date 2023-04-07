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
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "US Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"
					}
				]
			}
		},
		{
			module: "compliments",
			position: "lower_third"
		},
		{ module: "MMM-OpenmapWeather",
		  position: "top_right",
		  config: { 
			location: "Charbonnière-les-bains,FR",
			           locationID: "3026700",
						appid: "c0526873bd2aaf4e98ead041cf09c76c",
						colorIcon: true                     
					}        
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "Actualités",
						url: "https://www.lemonde.fr/rss/une.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				updateInterval: 300000,
				animationSpeed: 2500,
				maxNewsItems: 5,
				ignoreOldItems: true,
				ignoreOlderThan: 24 * 60 * 60 * 1000,
				wrapTitle: true,
				wrapDescription: true,
				truncateDescription: true,
				lengthDescription: 150,
				reloadInterval: 60 * 60 * 1000
			}
		},
		{
			module: "MMM-Breathwork",
			position: "bottom_right",
		},
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
		{
			module: "MMM-cryptocurrency",
			position: "top_right",
			config: {
				apikey: 'bdf1ec47-30c4-4de8-832f-4a36297ae85a',
				currency: ['bitcoin', 'ethereum', 'solana', 'xrp', 'litecoin'],
				conversion: 'EUR',
				headers: ['change24h', 'change1h', 'change7d'],
				displayType: 'logoWithChanges',
				showGraphs: true
			}
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
