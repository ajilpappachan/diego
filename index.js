const dotenv = require("dotenv");
dotenv.config();

const DiscordJS = require("discord.js");
const Intents = DiscordJS.Intents;
const client = new DiscordJS.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
	console.log("Bot is ready!");
});

client.login(process.env.TOKEN);
