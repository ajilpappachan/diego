const projectItemSchema = require("../../schemas/projectItemSchema");

module.exports = {
	category: "Projects",
	description: "Add item to projects",

	slash: true,
	testOnly: true,

	options: [
		{
			name: "name",
			description: "name of project",
			required: true,
			type: 3,
		},
		{
			name: "deadline",
			description: "deadline for the project (format: dd/mm/yyyy)",
			required: true,
			type: 3,
		},
		{
			name: "owner",
			description: "who is the project owner? (Val or Aju)",
			required: true,
			type: 3,
		},
	],

	callback: async ({ interaction }) => {
		await interaction.deferReply();
		const results = await projectItemSchema.find({});
		const _id = results.length + 1;
		const name = interaction.options.getString("name");
		const deadlineDetails = interaction.options
			.getString("deadline")
			.split("/");
		const deadline = new Date(
			deadlineDetails[2],
			parseInt(deadlineDetails[1]) - 1,
			deadlineDetails[0]
		);
		const owner = interaction.options.getString("owner") || 1;
		await new projectItemSchema({
			_id,
			name,
			deadline,
			owner,
			completed: false,
		}).save();
		interaction.editReply(`"${name}" added to projects list`);
	},
};
