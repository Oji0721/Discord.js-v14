const { WbotClient } = require('./client/WbotClient');
const { glob } = require("glob");
const { promisify } = require("util");
const ascii = require('ascii-table');

const globPromise = promisify(glob);

const client = new WbotClient();

module.exports = client;

['eventHandler', 'guildCommandHandler', 'commandHandler'].forEach((handlers) => {
  require(`./handler/${handlers}`) (client, globPromise, ascii)
});

client.start();