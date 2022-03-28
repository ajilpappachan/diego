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
		{
			name: "priority",
			description: "priority in list",
			required: false,
			type: 10,
		},
	],

	callback: async ({ interaction }) => {
		await interaction.deferReply();
		const name = interaction.options.getString("name");
		const priority = interaction.options.getNumber("priority") || 1;
		await new watchItemSchema({
			name,
			priority,
		}).save();
		interaction.editReply(`${name} added to watchlist`);
	},
};
