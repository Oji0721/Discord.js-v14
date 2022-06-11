const { WbotClient } = require('./client/WbotClient');

const client = new WbotClient();

module.exports = client;

client.start();
