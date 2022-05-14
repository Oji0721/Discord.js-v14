const { WbotClient } = require('./client/WbotClient');
const { glob } = require("glob");
const { promisify } = require("util");
const ascii = require('ascii-table');
require('dotenv').config();

const globPromise = promisify(glob);

const client = new WbotClient();

module.exports = client;

['commandHandler', 'eventHandler', 'guildSlashCommandHandler', 'serverHandler', 'slashCommandHandler'].forEach((handlers) => {
  require(`./handler/${handlers}`) (client, globPromise, ascii)
});

client.login(process.env.DISCORD_TOKEN);