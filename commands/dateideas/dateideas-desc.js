const MessageEmbed = require("discord.js").MessageEmbed;
const dateIdeaSchema = require("../../schemas/dateIdeaSchema");

module.exports = {
	category: "Date Ideas",
	description: "View description of Date idea",

	slash: true,
	testOnly: true,

	options: [
		{
			name: "id",
			description: "id of idea in list",
			required: true,
			type: 4,
		},
	],

	callback: async ({ interaction }) => {
		//await interaction.deferReply();
		const _id = interaction.options.getInteger("id");
		const item = await dateIdeaSchema.findOne({ _id });
		if (!item) return `Could not find item with id ${_id}`;
		//interaction.editReply(`"${name}" added to bucket list`);
		const embed = new MessageEmbed()
			.setTitle(item.name)
			.setDescription(item.description);
		return embed;
	},
};
