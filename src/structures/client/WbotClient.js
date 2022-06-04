const { Client, Collection } = require('discord.js');
require('dotenv').config();

class WbotClient extends Client {
  constructor() {
    super({
      partials: [ 21 ],
      intents: 131071
    });
    this.commands = new Collection();
    this.snipes = new Collection();
    this.cooldown = new Collection();
    this.config = require("../config/config.json");
    this.owners = this.config.owners;
    this.color = this.config.color;
  }
  start() {
    if(!process.env.DISCORD_TOKEN) return console.log('❌ Please provide a DISCORD_TOKEN and put it in .env file');
    this.login(process.env.DISCORD_TOKEN);
  }
}

module.exports = { WbotClient };
