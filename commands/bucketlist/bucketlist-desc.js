const MessageEmbed = require("discord.js").MessageEmbed;
const bucketItemSchema = require("../../schemas/bucketItemSchema");

module.exports = {
	category: "Bucketlist",
	description: "View description of bucket list item",

	slash: true,
	testOnly: true,

	options: [
		{
			name: "id",
			description: "id of list item",
			required: true,
			type: 4,
		},
	],

	callback: async ({ interaction }) => {
		//await interaction.deferReply();
		const _id = interaction.options.getInteger("id");
		const item = await bucketItemSchema.findOne({ _id });
		if (!item) return `Could not find item with id ${_id}`;
		//interaction.editReply(`"${name}" added to bucket list`);
		const embed = new MessageEmbed()
			.setTitle(item.name)
			.setDescription(item.description);
		return embed;
	},
};
