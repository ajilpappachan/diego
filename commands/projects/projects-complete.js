const projectItemSchema = require("../../schemas/projectItemSchema");

module.exports = {
	category: "Projects",
	description: "Set a project as completed",

	slash: true,
	testOnly: true,

	options: [
		{
			name: "id",
			description: "id of project",
			required: true,
			type: 4,
		},
	],

	callback: async ({ interaction }) => {
		await interaction.deferReply();
		const _id = interaction.options.getInteger("id");
		const item = await projectItemSchema.findOneAndUpdate(
			{ _id },
			{ completed: true }
		);
		if (!item) return `Could not find project with id ${_id}`;
		interaction.editReply(`${item.name} marked as completed`);
	},
};
