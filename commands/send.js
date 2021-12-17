const { createApi } = require("unsplash-js");
const nodeFetch = require("node-fetch");

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	fetch: nodeFetch,
});

module.exports = {
	category: "Requests",
	description: "Send noods",

	expectedArgs: "<name>",
	minArgs: 1,
	maxArgs: 1,
	SyntaxError: "que?",

	slash: "both",
	testOnly: true,

	callback: async ({ channel, args }) => {
		const result = await unsplash.photos.getRandom({
			query: args[0],
			count: args[1],
		});

		const url = result.response.urls.regular;

		return url;
	},
};
