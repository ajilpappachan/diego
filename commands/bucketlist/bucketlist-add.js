const bucketItemSchema = require("../../schemas/bucketItemSchema");

module.exports = {
	category: "Bucketlist",
	description: "Add item to bucketlist",

	slash: true,
	testOnly: true,

	options: [
		{
			name: "name",
			description: "name of list item",
			required: true,
			type: 3,
		},
		{
			name: "description",
			description: "description of list item",
			required: true,
			type: 3,
		},
		{
			name: "priority",
			description: "priority in list",
			required: false,
			type: 4,
		},
	],

	callback: async ({ interaction }) => {
		await interaction.deferReply();
		const results = await bucketItemSchema.find({});
		const _id = results.length + 1;
		const name = interaction.options.getString("name");
		const description = interaction.options.getString("description");
		const priority = interaction.options.getNumber("priority") || 1;
		await new bucketItemSchema({
			_id,
			name,
			priority,
			description,
		}).save();
		interaction.editReply(`"${name}" added to bucket list`);
	},
};
