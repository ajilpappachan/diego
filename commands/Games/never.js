const questions = require("../../src/never-have-i-ever-questions");

module.exports = {
	category: "Games",
	description: "Ask a Never Have I Ever question",

	slash: "both",
	testOnly: true,

	callback: () => {
		return questions[Math.floor(Math.random() * questions.length)];
	},
};
