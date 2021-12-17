const watchItemSchema = require("../../schemas/watchItemSchema");

module.exports = {
	category: "Watchlist",
	description: "Add item to watchlist",

	slash: true,
	testOnly: true,

	options: [
		{
			name: "name",
			description: "name of movie/show",
			required: true,
			type: 3,
		},
	],

	callback: async ({ interaction }) => {
		await interaction.deferReply();
		const name = interaction.options.getString("name");
		await new watchItemSchema({
			name,
		}).save();
		interaction.editReply(`${name} added to watchlist`);
	},
};
