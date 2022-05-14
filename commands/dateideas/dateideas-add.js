const dateIdeaSchema = require("../../schemas/dateIdeaSchema");

module.exports = {
	category: "Date Ideas",
	description: "Add item to date ideas list",

	slash: true,
	testOnly: true,

	options: [
		{
			name: "name",
			description: "idea name",
			required: true,
			type: 3,
		},
		{
			name: "description",
			description: "idea description",
			required: true,
			type: 3,
		},
		{
			name: "priority",
			description: "priority of idea",
			required: false,
			type: 4,
		},
	],

	callback: async ({ interaction }) => {
		await interaction.deferReply();
		const results = await dateIdeaSchema.find({});
		const _id = results.length + 1;
		const name = interaction.options.getString("name");
		const description = interaction.options.getString("description");
		const priority = interaction.options.getNumber("priority") || 1;
		await new dateIdeaSchema({
			_id,
			name,
			priority,
			description,
		}).save();
		interaction.editReply(`"${name}" added to Date ideas`);
	},
};
