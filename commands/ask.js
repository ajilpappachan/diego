const questions = require("../src/questions");

module.exports = {
	category: "Requests",
	description: "Ask a random conversations starter",

	slash: "both",
	testOnly: true,

	callback: () => {
		return questions[Math.floor(Math.random() * questions.length)];
	},
};
