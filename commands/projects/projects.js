const MessageEmbed = require("discord.js").MessageEmbed;
const projectItemSchema = require("../../schemas/projectItemSchema");

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

const strikeThrough = (text) => {
	return text
		.split("")
		.map((char) => char + "\u0336")
		.join("");
};

module.exports = {
	category: "Projects",
	description: "View all items in projects",

	slash: "both",
	testOnly: true,

	callback: async ({ interaction }) => {
		await interaction.deferReply();
		let list = "";
		const results = await projectItemSchema.find({}, null, {
			sort: { completed: "ascending", deadline: "ascending" },
		});
		results.forEach((item) => {
			let listItem = `${
				item._id
			}. ${item.owner.toTitleCase()} - ${item.name.toTitleCase()} (Deadline: ${item.deadline.toLocaleDateString(
				"en-gb"
			)})`;
			if (item.completed) listItem = strikeThrough(listItem);
			list += listItem + "\n";
		});
		const embed = new MessageEmbed().setTitle("Projects").setDescription(list);
		interaction.editReply({ embeds: [embed] });
	},
};
