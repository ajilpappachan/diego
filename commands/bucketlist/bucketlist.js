const MessageEmbed = require("discord.js").MessageEmbed;
const bucketItemSchema = require("../../schemas/bucketItemSchema");

String.prototype.toTitleCase = function () {
	var i, j, str, lowers, uppers;
	str = this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});

	// Certain minor words should be left lowercase unless
	// they are the first or last words in the string
	lowers = [
		"A",
		"An",
		"The",
		"And",
		"But",
		"Or",
		"For",
		"Nor",
		"As",
		"At",
		"By",
		"For",
		"From",
		"In",
		"Into",
		"Near",
		"Of",
		"On",
		"Onto",
		"To",
		"With",
	];
	for (i = 0, j = lowers.length; i < j; i++)
		str = str.replace(
			new RegExp("\\s" + lowers[i] + "\\s", "g"),
			function (txt) {
				return txt.toLowerCase();
			}
		);

	// Certain words such as initialisms or acronyms should be left uppercase
	uppers = ["Id", "Tv"];
	for (i = 0, j = uppers.length; i < j; i++)
		str = str.replace(
			new RegExp("\\b" + uppers[i] + "\\b", "g"),
			uppers[i].toUpperCase()
		);

	return str;
};

module.exports = {
	category: "Bucketlist",
	description: "View all items in bucket list",

	slash: "both",
	testOnly: true,

	callback: async () => {
		let list = "";
		const results = await bucketItemSchema.find({});
		results.sort((a, b) => b.priority - a.priority);
		results.forEach((item) => {
			list += `${item._id}. ${item.name.toTitleCase()}\n`;
		});
		const embed = new MessageEmbed()
			.setTitle("Bucket list")
			.setDescription(list);
		return embed;
	},
};
