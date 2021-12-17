const dotenv = require("dotenv");
dotenv.config();

const DiscordJS = require("discord.js");
const Intents = DiscordJS.Intents;
const client = new DiscordJS.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const WOKCommands = require("wokcommands");
const path = require("path");

client.on("ready", () => {
	console.log("Bot is ready!");

	new WOKCommands(client, {
		commandsDir: path.join(__dirname, "commands"),
		testServers: ["910970317160189962"],
		botOwners: ["444094552723423232"],
		mongoUri: process.env.DATABASE_URL,
	});
});

client.login(process.env.DISCORD_TOKEN);
