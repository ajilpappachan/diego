const fetch = require("node-fetch");

const url = "https://www.timeapi.io/api/Time/current/zone?timeZone=";
const indiaTimeZone = "Asia/Kolkata";
const usTimeZone = "US/Michigan";

module.exports = {
	category: "Time",
	description: "Time for Aju and Val",

	slash: "both",
	testOnly: true,

	callback: async () => {
		const ajuTime = `Aju's time: ${await getTimeString(indiaTimeZone)}`;
		const valTime = `Val's time: ${await getTimeString(usTimeZone)}`;
		return ajuTime + "\n" + valTime;
	},
};

const getTimeString = async (timeZone) => {
	const response = await fetch(url + timeZone);
	const { date, hour, minute } = await response.json();
	const time = `${date} ${hour % 12}:${`00${minute}`.slice(-2)} ${
		hour / 12 != 0 ? "PM" : "AM"
	}`;
	return time;
};
