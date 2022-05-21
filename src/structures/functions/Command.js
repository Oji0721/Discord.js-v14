const { ChatInputCommandInteraction, ApplicationCommandOptionData } = require('discord.js');
const { WbotClient } = require('../client/WbotClient');

/**
* @param {WbotClient} client
* @param {ChatInputCommandInteraction} interaction
* @param {String[]} args
*/
function RunFunction(client, interaction, args) {}

class Command {
  /**
  * @typedef {{ name: String, description: String, cooldown: Number options: ApplicationCommandOptionData, run: RunFunction }} CommandOptions
  * @param {CommandOptions} options
  */
  constructor(options) {
    this.name = options.name;
    this.description = options.description;
    this.cooldown = options.cooldown;
    this.options = options.options;
  }
}

module.exports = { Command }