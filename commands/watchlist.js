const watchItemSchema = require("../schemas/watchItemSchema");

module.exports = {
	category: "Watchlist",
	description: "View all items in watchlist",

	slash: "both",
	testOnly: true,

	callback: async () => {
		let list = "";
		const results = await watchItemSchema.find({});
		results.forEach((item) => {
			list += `${item.name}\n`;
		});
		return list;
	},
};
